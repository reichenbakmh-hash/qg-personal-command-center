import React from "react";
import { Card, SectionTitle } from "../../components/qg/Primitives";

export default function AnalyticsView({ t }) {
  const execRate = 81;
  const weekly = [40, 55, 35, 70, 60, 80, 73];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 12 }}>
        <Card t={t} padding={16}>
          <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginBottom: 6 }}>EXECUTION RATE</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: t.text }}>{execRate}%</div>
        </Card>
        <Card t={t} padding={16}>
          <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginBottom: 6 }}>MISSIONS COMPLETED</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: t.text }}>27</div>
        </Card>
        <Card t={t} padding={16}>
          <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginBottom: 6 }}>RISQUES ACTIFS</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: t.text }}>4</div>
        </Card>
      </div>
      <Card t={t} padding={20}>
        <SectionTitle t={t}>Charge hebdomadaire</SectionTitle>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140 }}>
          {weekly.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: "100%", height: `${v}%`, background: t.primary, borderRadius: "6px 6px 0 0", opacity: 0.85 }} />
              <span style={{ fontSize: 10.5, color: t.textFaint }}>{["L", "M", "M", "J", "V", "S", "D"][i]}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
