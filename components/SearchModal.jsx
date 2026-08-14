import React, { useState, useMemo } from "react";
import { Search, X, Plus } from "lucide-react";
import { CAMPAIGNS, MISSIONS, CONTACTS } from "../../lib/qg/demoData";

export default function SearchModal({ t, onClose, setView }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const query = q.toLowerCase().trim();
    const pools = [
      ...CAMPAIGNS.map((c) => ({ type: "Campagne", label: c.name, id: c.id, go: "campaigns" })),
      ...MISSIONS.map((m) => ({ type: "Mission", label: `#${m.id} — ${m.name}`, id: m.id, go: "missions" })),
      ...CONTACTS.map((c) => ({ type: "Contact", label: c.name, id: c.id, go: "contacts" })),
    ];
    if (!query) return pools.slice(0, 6);
    return pools.filter((p) => p.label.toLowerCase().includes(query)).slice(0, 8);
  }, [q]);

  const quickActions = [
    { label: "Nouvelle mission", go: "missions" },
    { label: "Nouvelle campagne", go: "campaigns" },
    { label: "Ouvrir War Room", go: "warroom" },
    { label: "Ouvrir Agenda", go: "agenda" },
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,17,21,0.55)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "10vh 16px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 560, maxWidth: "100%", background: t.surface, borderRadius: 16, border: `1px solid ${t.border}`, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: `1px solid ${t.border}` }}>
          <Search size={17} color={t.textFaint} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher une mission, campagne, contact…"
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14.5, color: t.text }}
          />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: t.textFaint }}><X size={17} /></button>
        </div>
        <div style={{ maxHeight: 360, overflowY: "auto", padding: 8 }}>
          {!q && (
            <div style={{ padding: "6px 8px 10px" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: t.textFaint, letterSpacing: 0.6, margin: "4px 4px 6px" }}>ACTIONS RAPIDES</div>
              {quickActions.map((a) => (
                <button key={a.label} onClick={() => { setView(a.go); onClose(); }} style={{
                  width: "100%", textAlign: "left", padding: "9px 10px", borderRadius: 8, border: "none",
                  background: "transparent", color: t.text, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                }}>
                  <Plus size={14} color={t.primary} /> {a.label}
                </button>
              ))}
            </div>
          )}
          <div style={{ fontSize: 10.5, fontWeight: 700, color: t.textFaint, letterSpacing: 0.6, margin: "8px 12px 6px" }}>RÉSULTATS</div>
          {results.length === 0 && <div style={{ padding: "16px 12px", fontSize: 13, color: t.textFaint }}>Aucun résultat.</div>}
          {results.map((r) => (
            <button key={r.type + r.id} onClick={() => { setView(r.go); onClose(); }} style={{
              width: "100%", textAlign: "left", padding: "9px 10px", borderRadius: 8, border: "none",
              background: "transparent", color: t.text, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span>{r.label}</span>
              <span style={{ fontSize: 11, color: t.textFaint }}>{r.type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
