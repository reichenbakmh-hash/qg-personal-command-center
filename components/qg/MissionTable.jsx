import React from "react";
import { Target } from "lucide-react";
import { Card, Badge, EmptyState } from "./Primitives";
import { priorityColor, statusColor, daysUntil } from "../../lib/qg/helpers";

export default function MissionTable({ t, missions, compact }) {
  if (missions.length === 0) {
    return <EmptyState t={t} icon={Target} title="Aucune mission" body="Créez votre première mission pour commencer à exécuter vos objectifs." actionLabel="Nouvelle mission" />;
  }
  return (
    <Card t={t} padding={0} style={{ overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t.border}`, background: t.surfaceAlt }}>
              {["ID", "Mission", "Campagne", "Priorité", "Statut", "Échéance", !compact && "Est. / Réel"].filter(Boolean).map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: t.textFaint, fontWeight: 600, fontSize: 11, letterSpacing: 0.4, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {missions.map((m) => {
              const dleft = daysUntil(m.deadline);
              return (
                <tr key={m.id} style={{ borderBottom: `1px solid ${t.border}` }}>
                  <td style={{ padding: "11px 14px", color: t.textFaint, fontWeight: 600 }}>#{m.id}</td>
                  <td style={{ padding: "11px 14px", color: t.text, fontWeight: 500, maxWidth: 260 }}>{m.name}</td>
                  <td style={{ padding: "11px 14px", color: t.textSecondary, whiteSpace: "nowrap" }}>{m.campaign}</td>
                  <td style={{ padding: "11px 14px" }}><Badge t={t} color={priorityColor(t, m.priority)} soft={t.surfaceAlt}>{m.priority}</Badge></td>
                  <td style={{ padding: "11px 14px" }}><Badge t={t} color={statusColor(t, m.status)} soft={t.surfaceAlt}>{m.status}</Badge></td>
                  <td style={{ padding: "11px 14px", color: dleft <= 2 ? t.danger : t.textSecondary, fontWeight: dleft <= 2 ? 600 : 400, whiteSpace: "nowrap" }}>
                    {m.deadline} {dleft >= 0 && dleft <= 7 && `(J-${dleft})`}
                  </td>
                  {!compact && <td style={{ padding: "11px 14px", color: t.textSecondary, whiteSpace: "nowrap" }}>{m.est} / {m.actual}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
