/**
 * QG — Personal Command Center — Worker API
 * Gère uniquement /api/* (voir wrangler.jsonc: run_worker_first).
 * Tout le reste (front React buildé) est servi directement par les assets statiques.
 */

/* ------------------------------------------------------------------ */
/* HELPERS JSON / RÉPONSES                                             */
/* ------------------------------------------------------------------ */
function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}
function errorJson(message, status = 400) {
  return json({ error: message }, status);
}

/* ------------------------------------------------------------------ */
/* JWT MINIMAL (HMAC-SHA256) — sans dépendance externe                 */
/* ------------------------------------------------------------------ */
function base64url(input) {
  let str = typeof input === "string" ? input : String.fromCharCode(...new Uint8Array(input));
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function base64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return atob(str);
}
async function hmacKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}
async function signJWT(payload, secret, expiresInSeconds = 60 * 60 * 24 * 7) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = { ...payload, iat: now, exp: now + expiresInSeconds };
  const encHeader = base64url(JSON.stringify(header));
  const encPayload = base64url(JSON.stringify(fullPayload));
  const data = `${encHeader}.${encPayload}`;
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const encSig = base64url(sig);
  return `${data}.${encSig}`;
}
async function verifyJWT(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [encHeader, encPayload, encSig] = parts;
  const data = `${encHeader}.${encPayload}`;
  const key = await hmacKey(secret);
  const sigBytes = Uint8Array.from(base64urlDecode(encSig), (c) => c.charCodeAt(0));
  const valid = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(data));
  if (!valid) return null;
  const payload = JSON.parse(base64urlDecode(encPayload));
  if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return null;
  return payload;
}

/* ------------------------------------------------------------------ */
/* AUTH — session par cookie httpOnly signé (utilisateur unique)       */
/* ------------------------------------------------------------------ */
function getCookie(request, name) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}
function sessionCookieHeader(token, maxAgeSeconds) {
  return `qg_session=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAgeSeconds}`;
}
function clearSessionCookieHeader() {
  return `qg_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}
async function requireAuth(request, env) {
  const token = getCookie(request, "qg_session");
  if (!token) return null;
  const payload = await verifyJWT(token, env.JWT_SECRET);
  return payload; // null si invalide/expiré
}

/* ------------------------------------------------------------------ */
/* SCHÉMA CRUD GÉNÉRIQUE — une entrée par table, colonnes autorisées   */
/* ------------------------------------------------------------------ */
const OWNER_USER_ID = "owner"; // application mono-utilisateur : un seul propriétaire logique

const TABLES = {
  campaigns: {
    table: "campaigns",
    fields: ["name", "objective", "status", "priority", "progress", "color", "deadline", "risk_level", "is_archived"],
  },
  objectives: {
    table: "objectives",
    fields: ["campaign_id", "parent_objective_id", "type", "title", "description", "status", "progress"],
  },
  missions: {
    table: "missions",
    fields: [
      "campaign_id", "objective_id", "code", "name", "description", "context", "constraints",
      "priority", "difficulty", "status", "deadline", "estimated_minutes", "actual_minutes", "depends_on_mission_id",
    ],
  },
  tasks: {
    table: "tasks",
    fields: ["mission_id", "title", "is_done", "position"],
  },
  events: {
    table: "events",
    fields: [
      "campaign_id", "mission_id", "contact_id", "title", "starts_at", "ends_at",
      "priority", "color", "recurrence_rule", "is_completed", "reminder_minutes_before",
    ],
  },
  notes: {
    table: "notes",
    fields: ["campaign_id", "mission_id", "title", "content_markdown", "is_pinned", "is_archived"],
  },
  intel: {
    table: "intelligence_records",
    fields: [
      "campaign_id", "mission_id", "category", "title", "content",
      "source_reliability", "information_confidence", "status", "recorded_at",
    ],
  },
  resources: {
    table: "resources",
    fields: ["campaign_id", "type", "name", "quantity_required", "quantity_available", "unit"],
  },
  contacts: {
    table: "contacts",
    fields: ["name", "alias", "category", "notes", "last_interaction_at"],
  },
  decisions: {
    table: "decisions",
    fields: [
      "campaign_id", "context", "problem", "options_considered", "decision_made",
      "justification", "expected_outcome", "actual_outcome", "decided_at",
    ],
  },
  risks: {
    table: "risks",
    fields: ["campaign_id", "mission_id", "title", "probability", "impact", "level", "mitigation", "status"],
  },
  tags: {
    table: "tags",
    fields: ["name", "color"],
  },
};

async function logActivity(env, entityType, entityId, action, description) {
  try {
    await env.DB.prepare(
      `INSERT INTO activity_log (id, user_id, entity_type, entity_id, action, description) VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(crypto.randomUUID(), OWNER_USER_ID, entityType, entityId, action, description)
      .run();
  } catch (e) {
    // le log d'activité ne doit jamais faire échouer la requête principale
  }
}

async function handleCrud(request, env, resource, id) {
  const def = TABLES[resource];
  if (!def) return errorJson("Ressource inconnue", 404);
  const { table, fields } = def;

  if (request.method === "GET" && !id) {
    const url = new URL(request.url);
    let query = `SELECT * FROM ${table} WHERE user_id = ?`;
    const binds = [OWNER_USER_ID];
    // filtre simple par foreign key si présent en query string (ex: ?campaign_id=xxx)
    for (const f of fields) {
      const v = url.searchParams.get(f);
      if (v !== null) {
        query += ` AND ${f} = ?`;
        binds.push(v);
      }
    }
    query += ` ORDER BY created_at DESC LIMIT 200`;
    const { results } = await env.DB.prepare(query).bind(...binds).all();
    return json({ data: results });
  }

  if (request.method === "GET" && id) {
    const row = await env.DB.prepare(`SELECT * FROM ${table} WHERE id = ? AND user_id = ?`).bind(id, OWNER_USER_ID).first();
    if (!row) return errorJson("Introuvable", 404);
    return json({ data: row });
  }

  if (request.method === "POST") {
    const body = await request.json().catch(() => ({}));
    const newId = crypto.randomUUID();
    const cols = ["id", "user_id", ...fields.filter((f) => body[f] !== undefined)];
    const placeholders = cols.map(() => "?").join(", ");
    const values = cols.map((c) => (c === "id" ? newId : c === "user_id" ? OWNER_USER_ID : body[c]));
    await env.DB.prepare(`INSERT INTO ${table} (${cols.join(", ")}) VALUES (${placeholders})`).bind(...values).run();
    await logActivity(env, resource, newId, "created", `${resource} créé`);
    const row = await env.DB.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(newId).first();
    return json({ data: row }, 201);
  }

  if (request.method === "PUT" && id) {
    const body = await request.json().catch(() => ({}));
    const updatable = fields.filter((f) => body[f] !== undefined);
    if (updatable.length === 0) return errorJson("Rien à mettre à jour", 400);
    const setClause = updatable.map((f) => `${f} = ?`).join(", ");
    const values = updatable.map((f) => body[f]);
    await env.DB.prepare(`UPDATE ${table} SET ${setClause}, updated_at = datetime('now') WHERE id = ? AND user_id = ?`)
      .bind(...values, id, OWNER_USER_ID)
      .run();
    await logActivity(env, resource, id, "updated", `${resource} mis à jour`);
    const row = await env.DB.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
    if (!row) return errorJson("Introuvable", 404);
    return json({ data: row });
  }

  if (request.method === "DELETE" && id) {
    await env.DB.prepare(`DELETE FROM ${table} WHERE id = ? AND user_id = ?`).bind(id, OWNER_USER_ID).run();
    await logActivity(env, resource, id, "deleted", `${resource} supprimé`);
    return json({ ok: true });
  }

  return errorJson("Méthode non supportée", 405);
}

/* ------------------------------------------------------------------ */
/* ROUTER PRINCIPAL                                                     */
/* ------------------------------------------------------------------ */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      /* ---- routes publiques (pas d'auth requise) ---- */
      if (path === "/api/health" && request.method === "GET") {
        return json({ status: "ok", app: env.APP_NAME || "QG", version: env.APP_VERSION || "1.0.0", time: new Date().toISOString() });
      }

      if (path === "/api/database/status" && request.method === "GET") {
        const row = await env.DB.prepare("SELECT COUNT(*) as table_count FROM sqlite_master WHERE type='table'").first();
        return json({ status: "connected", tables: row.table_count });
      }

      if (path === "/api/login" && request.method === "POST") {
        const body = await request.json().catch(() => ({}));
        const code = body.code || "";
        if (!env.ACCESS_CODE) return errorJson("ACCESS_CODE non configuré côté serveur", 500);
        if (code !== env.ACCESS_CODE) return errorJson("Code d'accès invalide", 401);
        const token = await signJWT({ sub: OWNER_USER_ID }, env.JWT_SECRET);
        return json({ ok: true }, 200, { "Set-Cookie": sessionCookieHeader(token, 60 * 60 * 24 * 7) });
      }

      if (path === "/api/logout" && request.method === "POST") {
        return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookieHeader() });
      }

      if (path === "/api/me" && request.method === "GET") {
        const session = await requireAuth(request, env);
        if (!session) return errorJson("Non authentifié", 401);
        return json({ authenticated: true, user: session.sub });
      }

      /* ---- tout le reste de /api/* exige une session valide ---- */
      const session = await requireAuth(request, env);
      if (!session) return errorJson("Non authentifié", 401);

      /* ---- routes CRUD génériques : /api/<resource> ou /api/<resource>/<id> ---- */
      const apiMatch = path.match(/^\/api\/([a-z_]+)(?:\/([a-zA-Z0-9-]+))?$/);
      if (apiMatch) {
        const [, resource, id] = apiMatch;
        if (TABLES[resource]) {
          return await handleCrud(request, env, resource, id);
        }
      }

      /* ---- activité récente (lecture seule) ---- */
      if (path === "/api/activity" && request.method === "GET") {
        const { results } = await env.DB.prepare(
          "SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 50"
        ).bind(OWNER_USER_ID).all();
        return json({ data: results });
      }

      /* ---- notifications ---- */
      if (path === "/api/notifications" && request.method === "GET") {
        const { results } = await env.DB.prepare(
          "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 100"
        ).bind(OWNER_USER_ID).all();
        return json({ data: results });
      }
      if (path.match(/^\/api\/notifications\/[a-zA-Z0-9-]+\/read$/) && request.method === "POST") {
        const id = path.split("/")[3];
        await env.DB.prepare("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?").bind(id, OWNER_USER_ID).run();
        return json({ ok: true });
      }

      return errorJson("Route API introuvable", 404);
    } catch (err) {
      return errorJson(`Erreur serveur: ${err.message}`, 500);
    }
  },
};
