import React from "react";
import { Card, SectionTitle } from "../../components/qg/Primitives";
import { AGENDA_DAYS, AGENDA_EVENTS } from "../../lib/qg/demoData";

export default function AgendaView({ t }) {
  return (
    <div>
      <SectionTitle t={t} action={<span style={{ fontSize: 12.5, color: t.textFaint }}>Semaine du 17 au 23 août 2026</span>}>
        Agenda — Vue semaine
      </SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(140px, 1fr))", gap: 10, overflowX: "auto" }}>
        {AGENDA_DAYS.map((d) => (
          <Card t={t} padding={10} key={d} style={{ minHeight: 180 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${t.border}` }}>{d}</div>
            {AGENDA_EVENTS[d].length === 0 && <div style={{ fontSize: 11.5, color: t.textFaint }}>Aucun événement</div>}
            {AGENDA_EVENTS[d].map((e, i) => (
              <div key={i} style={{ background: `${e.color}18`, borderLeft: `3px solid ${e.color}`, borderRadius: 6, padding: "6px 8px", marginBottom: 6 }}>
                <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 600 }}>{e.time}</div>
                <div style={{ fontSize: 12, color: t.text, fontWeight: 500, lineHeight: 1.3 }}>{e.title}</div>
                <div style={{ fontSize: 10.5, color: t.textSecondary, marginTop: 2 }}>{e.tag}</div>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}
