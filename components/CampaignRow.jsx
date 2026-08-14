import React from "react";
import { Card, Badge, ProgressBar } from "./Primitives";
import { statusColor } from "../../lib/qg/helpers";

export default function CampaignRow({ t, c, onClick }) {
  return (
    <Card t={t} padding={16} style={{ cursor: "pointer" }}>
      <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 4, alignSelf: "stretch", borderRadius: 4, background: c.color, minHeight: 40 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{c.name}</span>
            <Badge t={t} color={statusColor(t, c.status)} soft={t.surfaceAlt}>{c.status}</Badge>
          </div>
          <div style={{ fontSize: 12.5, color: t.textSecondary, marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.objective}</div>
          <ProgressBar t={t} value={c.progress} color={c.color} />
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{c.progress}%</div>
          <div style={{ fontSize: 11, color: t.textFaint }}>{c.missions.done}/{c.missions.total} missions</div>
        </div>
      </div>
    </Card>
  );
}
