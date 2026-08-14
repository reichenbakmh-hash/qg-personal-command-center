import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, SectionTitle } from "../../components/qg/Primitives";
import KpiCard from "../../components/qg/KpiCard";
import AlertCard from "../../components/qg/AlertCard";
import CampaignRow from "../../components/qg/CampaignRow";
import MissionTable from "../../components/qg/MissionTable";
import { KPIS, ALERTS, CAMPAIGNS, MISSIONS, ACTIVITY } from "../../lib/qg/demoData";

export default function SituationView({ t, setView }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
          {KPIS.map((k) => <KpiCard t={t} kpi={k} key={k.label} />)}
        </div>
      </div>

      <div>
        <SectionTitle t={t} action={
          <button onClick={() => setView("warroom")} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12.5, color: t.primary, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
            Ouvrir la War Room <ArrowUpRight size={13} />
          </button>
        }>
          Command Center
        </SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ALERTS.map((a) => <AlertCard t={t} a={a} key={a.id} />)}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }} className="qg-grid-stack">
        <div>
          <SectionTitle t={t}>Campagnes actives</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CAMPAIGNS.filter((c) => c.status !== "Paused").map((c) => (
              <CampaignRow t={t} c={c} key={c.id} onClick={() => setView("campaigns")} />
            ))}
          </div>
        </div>
        <div>
          <SectionTitle t={t}>Activité récente</SectionTitle>
          <Card t={t} padding={6}>
            {ACTIVITY.map((a, i) => (
              <div key={a.id} style={{
                display: "flex", gap: 10, alignItems: "flex-start", padding: "11px 12px",
                borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${t.border}` : "none",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: 999, background: t.primary, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, color: t.text, lineHeight: 1.4 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div>
        <SectionTitle t={t}>Missions du jour</SectionTitle>
        <MissionTable t={t} missions={MISSIONS.filter((m) => ["In Progress", "Ready", "Blocked"].includes(m.status))} compact />
      </div>
    </div>
  );
}
