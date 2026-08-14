import React, { useState } from "react";
import { Filter, Plus } from "lucide-react";
import MissionTable from "../../components/qg/MissionTable";
import { MISSIONS } from "../../lib/qg/demoData";

export default function MissionsView({ t }) {
  const [filter, setFilter] = useState("Toutes");
  const statuses = ["Toutes", "Planned", "Ready", "In Progress", "Blocked", "Completed"];
  const filtered = filter === "Toutes" ? MISSIONS : MISSIONS.filter((m) => m.status === filter);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <Filter size={14} color={t.textFaint} />
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: "6px 12px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
            border: `1px solid ${filter === s ? t.primary : t.border}`,
            background: filter === s ? t.primarySoft : "transparent",
            color: filter === s ? t.primary : t.textSecondary,
          }}>{s}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: t.primary, color: "#fff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={14} /> Nouvelle mission
        </button>
      </div>
      <MissionTable t={t} missions={filtered} />
    </div>
  );
}
