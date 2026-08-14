import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "./Primitives";
import { accentColor, accentSoft } from "../../lib/qg/helpers";

export default function KpiCard({ t, kpi }) {
  const color = accentColor(t, kpi.accent);
  const soft = accentSoft(t, kpi.accent);
  const Icon = kpi.icon;
  const TrendIcon = kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : null;
  return (
    <Card t={t} padding={18}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: soft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} color={color} />
        </div>
        {kpi.delta !== "0" && TrendIcon && (
          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11.5, fontWeight: 600, color: kpi.accent === "danger" ? t.danger : t.success }}>
            <TrendIcon size={12} /> {kpi.delta}
          </span>
        )}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: t.text, letterSpacing: -0.5, lineHeight: 1.1 }}>{kpi.value}</div>
      <div style={{ fontSize: 12.5, color: t.textSecondary, marginTop: 4 }}>{kpi.label}</div>
    </Card>
  );
}
