import React, { useState } from "react";
import { Flag } from "lucide-react";
import { Card, Badge, ProgressBar } from "../../components/qg/Primitives";
import { priorityColor, statusColor } from "../../lib/qg/helpers";
import { CAMPAIGNS } from "../../lib/qg/demoData";
import CampaignDetail from "./CampaignDetail";

export default function CampaignsView({ t }) {
  const [selected, setSelected] = useState(null);
  if (selected) return <CampaignDetail t={t} c={selected} onBack={() => setSelected(null)} />;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
      {CAMPAIGNS.map((c) => (
        <Card key={c.id} t={t} padding={18} style={{ cursor: "pointer" }}>
          <div onClick={() => setSelected(c)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Flag size={14} color={c.color} />
              </div>
              <Badge t={t} color={priorityColor(t, c.priority)} soft={t.surfaceAlt}>{c.priority}</Badge>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 4 }}>{c.name}</div>
            <div style={{ fontSize: 12.5, color: t.textSecondary, marginBottom: 14, lineHeight: 1.5, minHeight: 36 }}>{c.objective}</div>
            <ProgressBar t={t} value={c.progress} color={c.color} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11.5, color: t.textFaint }}>
              <span>{c.missions.done}/{c.missions.total} missions</span>
              <span>{c.progress}%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
              <Badge t={t} color={statusColor(t, c.status)} soft={t.surfaceAlt}>{c.status}</Badge>
              <span style={{ fontSize: 11.5, color: t.textFaint }}>Échéance {c.deadline}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
