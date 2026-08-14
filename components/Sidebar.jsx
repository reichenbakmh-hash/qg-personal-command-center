import React from "react";
import { Zap, ChevronLeft, ChevronRight, Sun, Moon, X } from "lucide-react";
import { NAV } from "../../lib/qg/nav";

export default function Sidebar({ t, view, setView, collapsed, setCollapsed, mobileOpen, setMobileOpen, isDark, setIsDark }) {
  const width = collapsed ? 76 : 248;
  const content = (
    <div
      style={{
        width,
        minWidth: width,
        height: "100%",
        background: t.surface,
        borderRight: `1px solid ${t.border}`,
        display: "flex",
        flexDirection: "column",
        transition: "width 200ms ease",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 18px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, background: t.primary,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Zap size={18} color="#fff" strokeWidth={2.4} />
        </div>
        {!collapsed && (
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 15.5, fontWeight: 700, color: t.text, letterSpacing: -0.2, lineHeight: 1.1 }}>QG</div>
            <div style={{ fontSize: 10.5, color: t.textFaint, whiteSpace: "nowrap" }}>Personal Command Center</div>
          </div>
        )}
        <button
          onClick={() => setMobileOpen(false)}
          style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: t.textFaint, display: "none" }}
          className="qg-mobile-only"
        >
          <X size={18} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px" }}>
        {NAV.map((group) => (
          <div key={group.section} style={{ marginBottom: 18 }}>
            {!collapsed && (
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8, color: t.textFaint, padding: "0 8px 6px" }}>
                {group.section}
              </div>
            )}
            {group.items.map((item) => {
              const active = view === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { setView(item.id); setMobileOpen(false); }}
                  title={collapsed ? item.label : undefined}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    padding: collapsed ? "10px" : "9px 10px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius: 8,
                    border: "none",
                    background: active ? t.primarySoft : "transparent",
                    color: active ? t.primary : t.textSecondary,
                    fontSize: 13.5,
                    fontWeight: active ? 600 : 500,
                    cursor: "pointer",
                    marginBottom: 2,
                    transition: "all 150ms ease",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = t.surfaceAlt; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <Icon size={17} strokeWidth={2} style={{ flexShrink: 0 }} />
                  {!collapsed && <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ padding: 12, borderTop: `1px solid ${t.border}` }}>
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: collapsed ? "10px" : "9px 10px", justifyContent: collapsed ? "center" : "flex-start",
            borderRadius: 8, border: `1px solid ${t.border}`, background: t.surfaceAlt,
            color: t.textSecondary, fontSize: 13, fontWeight: 500, cursor: "pointer", marginBottom: 8,
          }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          {!collapsed && <span>{isDark ? "Mode clair" : "Mode sombre"}</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="qg-desktop-only"
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start",
            padding: "9px 10px", borderRadius: 8, border: "none", background: "transparent",
            color: t.textFaint, fontSize: 13, cursor: "pointer",
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>Réduire</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="qg-desktop-only" style={{ height: "100%" }}>{content}</div>
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }} className="qg-mobile-only-flex">
          <div style={{ width: 248, height: "100%" }}>{content}</div>
          <div onClick={() => setMobileOpen(false)} style={{ flex: 1, background: "rgba(0,0,0,0.4)" }} />
        </div>
      )}
    </>
  );
}
