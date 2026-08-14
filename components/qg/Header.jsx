import React from "react";
import { Menu, Search, Bell, Sun, Moon } from "lucide-react";

export default function Header({ t, title, breadcrumb, setMobileOpen, setSearchOpen, isDark, setIsDark }) {
  return (
    <div
      style={{
        position: "sticky", top: 0, zIndex: 20, background: t.surface,
        borderBottom: `1px solid ${t.border}`, padding: "14px 20px",
        display: "flex", alignItems: "center", gap: 14,
      }}
    >
      <button onClick={() => setMobileOpen(true)} className="qg-mobile-only" style={{ background: "none", border: "none", cursor: "pointer", color: t.text }}>
        <Menu size={20} />
      </button>

      <div>
        <div style={{ fontSize: 11, color: t.textFaint, fontWeight: 500 }}>{breadcrumb}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: t.text, letterSpacing: -0.3 }}>{title}</div>
      </div>

      <div style={{ flex: 1 }} />

      <button
        onClick={() => setSearchOpen(true)}
        className="qg-desktop-only-flex"
        style={{
          alignItems: "center", gap: 8, background: t.surfaceAlt, border: `1px solid ${t.border}`,
          borderRadius: 10, padding: "8px 12px", color: t.textFaint, fontSize: 13, cursor: "pointer",
          width: 260,
        }}
      >
        <Search size={15} />
        <span style={{ flex: 1, textAlign: "left" }}>Rechercher…</span>
        <span style={{ fontSize: 10.5, border: `1px solid ${t.border}`, borderRadius: 4, padding: "1px 5px", color: t.textFaint }}>⌘K</span>
      </button>

      <button onClick={() => setSearchOpen(true)} className="qg-mobile-only" style={{ background: "none", border: "none", color: t.text, cursor: "pointer" }}>
        <Search size={19} />
      </button>

      <button onClick={() => setIsDark(!isDark)} className="qg-mobile-only" style={{ background: "none", border: "none", color: t.text, cursor: "pointer" }}>
        {isDark ? <Sun size={19} /> : <Moon size={19} />}
      </button>

      <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: t.text }}>
        <Bell size={19} />
        <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: 999, background: t.danger, border: `1.5px solid ${t.surface}` }} />
      </button>

      <div style={{
        width: 32, height: 32, borderRadius: 999, background: t.primarySoft, color: t.primary,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 700,
      }}>
        AZ
      </div>
    </div>
  );
}
