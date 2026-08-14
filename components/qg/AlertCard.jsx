import React from "react";
import { ShieldAlert } from "lucide-react";
import { Card, Badge } from "./Primitives";
import { severityColor } from "../../lib/qg/helpers";

export default function AlertCard({ t, a }) {
  const color = severityColor(t, a.severity);
  const soft = a.severity === "Critical" ? t.dangerSoft : a.severity === "High" ? t.warningSoft : t.infoSoft;
  return (
    <Card t={t} padding={16} style={{ borderLeft: `3px solid ${color}` }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ShieldAlert size={15} color={color} />
          <span style={{ fontSize: 13.5, fontWeight: 600, color: t.text }}>{a.title}</span>
        </div>
        <Badge t={t} color={color} soft={soft}>{a.severity}</Badge>
      </div>
      <div style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.55, marginBottom: 8 }}>{a.body}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12 }}>
        <div>
          <div style={{ color: t.textFaint, fontWeight: 600, marginBottom: 2 }}>IMPACT</div>
          <div style={{ color: t.textSecondary, lineHeight: 1.5 }}>{a.impact}</div>
        </div>
        <div>
          <div style={{ color: t.textFaint, fontWeight: 600, marginBottom: 2 }}>RECOMMANDATION</div>
          <div style={{ color: t.textSecondary, lineHeight: 1.5 }}>{a.recommendation}</div>
        </div>
      </div>
    </Card>
  );
}
