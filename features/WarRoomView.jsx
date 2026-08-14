import React from "react";
import { Swords } from "lucide-react";
import { Card, SectionTitle } from "../../components/qg/Primitives";
import AlertCard from "../../components/qg/AlertCard";
import CampaignRow from "../../components/qg/CampaignRow";
import MissionTable from "../../components/qg/MissionTable";
import { ALERTS, CAMPAIGNS, MISSIONS } from "../../lib/qg/demoData";

export default function WarRoomView({ t }) {
  const critical = MISSIONS.filter((m) => m.priority === "Critical" || m.status === "Blocked");
  const atRisk = CAMPAIGNS.filter((c) => c.status === "At Risk" || c.risk === "High");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <Card t={t} padding={16} style={{ background: t.dangerSoft, border: `1px solid ${t.danger}44` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 700, color: t.danger }}>
          <Swords size={16} /> Que dois-je savoir maintenant ?
        </div>
        <div style={{ fontSize: 13, color: t.text, marginTop: 6, lineHeight: 1.55 }}>
          2 éléments critiques et 1 campagne à risque nécessitent une décision aujourd'hui.
        </div>
      </Card>

      <div>
        <SectionTitle t={t}>Alertes</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ALERTS.map((a) => <AlertCard t={t} a={a} key={a.id} />)}
        </div>
      </div>

      <div>
        <SectionTitle t={t}>Campagnes à risque</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {atRisk.map((c) => <CampaignRow t={t} c={c} key={c.id} onClick={() => {}} />)}
        </div>
      </div>

      <div>
        <SectionTitle t={t}>Missions critiques / bloquées</SectionTitle>
        <MissionTable t={t} missions={critical} />
      </div>
    </div>
  );
}
