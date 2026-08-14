import React from "react";
import { ChevronLeft } from "lucide-react";
import { Card, Badge, ProgressBar, SectionTitle } from "../../components/qg/Primitives";
import MissionTable from "../../components/qg/MissionTable";
import { statusColor, priorityColor, daysUntil } from "../../lib/qg/helpers";
import { MISSIONS } from "../../lib/qg/demoData";

export default function CampaignDetail({ t, c, onBack }) {
  const missions = MISSIONS.filter((m) => m.campaign === c.name);
  return (
    <div>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: t.textSecondary, fontSize: 13, cursor: "pointer", marginBottom: 16 }}>
        <ChevronLeft size={15} /> Retour aux campagnes
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: t.text, margin: 0 }}>{c.name}</h1>
        <Badge t={t} color={statusColor(t, c.status)} soft={t.surfaceAlt}>{c.status}</Badge>
        <Badge t={t} color={priorityColor(t, c.priority)} soft={t.surfaceAlt}>{c.priority}</Badge>
      </div>
      <div style={{ fontSize: 13.5, color: t.textSecondary, marginBottom: 22 }}>{c.objective}</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12, marginBottom: 22 }}>
        <Card t={t} padding={14}>
          <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginBottom: 6 }}>PROGRESSION</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 8 }}>{c.progress}%</div>
          <ProgressBar t={t} value={c.progress} color={c.color} />
        </Card>
        <Card t={t} padding={14}>
          <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginBottom: 6 }}>ÉCHÉANCE</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>{c.deadline}</div>
          <div style={{ fontSize: 11.5, color: t.textFaint, marginTop: 4 }}>J-{daysUntil(c.deadline)}</div>
        </Card>
        <Card t={t} padding={14}>
          <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginBottom: 6 }}>MISSIONS</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>{c.missions.done}/{c.missions.total}</div>
        </Card>
        <Card t={t} padding={14}>
          <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600, marginBottom: 6 }}>NIVEAU DE RISQUE</div>
          <Badge t={t} color={c.risk === "High" ? t.danger : c.risk === "Medium" ? t.warning : t.success} soft={t.surfaceAlt}>{c.risk}</Badge>
        </Card>
      </div>

      <SectionTitle t={t}>Missions liées</SectionTitle>
      <MissionTable t={t} missions={missions} />
    </div>
  );
}
