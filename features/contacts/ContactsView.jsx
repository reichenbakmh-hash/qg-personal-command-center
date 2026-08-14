import React from "react";
import { MessageCircle, Zap, Send, Link2 } from "lucide-react";
import { Card, SectionTitle } from "../../components/qg/Primitives";
import { CONTACTS, QUICK_LINKS } from "../../lib/qg/demoData";

export default function ContactsView({ t }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <SectionTitle t={t}>Quick Links</SectionTitle>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {QUICK_LINKS.map((l) => (
            <a key={l.id} href={l.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <Card t={t} padding={14} style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 150 }}>
                {l.id === "whatsapp" ? <MessageCircle size={16} color={t.success} /> : l.id === "discord" ? <Zap size={16} color={t.primary} /> : <Send size={16} color={t.info} />}
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{l.label}</span>
                <Link2 size={13} color={t.textFaint} style={{ marginLeft: "auto" }} />
              </Card>
            </a>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle t={t}>Contacts</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CONTACTS.map((c) => (
            <Card t={t} padding={14} key={c.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 999, background: t.primarySoft, color: t.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                  {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: t.text }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: t.textSecondary }}>{c.alias} · {c.category}</div>
                </div>
                <div style={{ fontSize: 11.5, color: t.textFaint }}>{c.last}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
