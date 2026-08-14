import React from "react";

export function Card({ t, children, style, padding = 20 }) {
  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding,
        boxShadow: t.shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Badge({ t, color, soft, children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 12,
        fontWeight: 600,
        padding: "3px 9px",
        borderRadius: 999,
        color,
        background: soft,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
      {children}
    </span>
  );
}

export function ProgressBar({ t, value, color }) {
  return (
    <div style={{ height: 8, borderRadius: 999, background: t.border, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${value}%`,
          background: color,
          borderRadius: 999,
          transition: "width 400ms ease",
        }}
      />
    </div>
  );
}

export function EmptyState({ t, icon: Icon, title, body, actionLabel }) {
  return (
    <Card t={t} padding={40} style={{ textAlign: "center" }}>
      <div
        style={{
          width: 48, height: 48, borderRadius: 12, background: t.primarySoft,
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
        }}
      >
        <Icon size={22} color={t.primary} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13.5, color: t.textSecondary, maxWidth: 380, margin: "0 auto 18px", lineHeight: 1.6 }}>
        {body}
      </div>
      <button
        style={{
          background: t.primary, color: "#fff", border: "none", borderRadius: 10,
          padding: "9px 18px", fontSize: 13.5, fontWeight: 600, cursor: "pointer",
        }}
      >
        {actionLabel}
      </button>
    </Card>
  );
}

export function SectionTitle({ t, children, action }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: t.text, margin: 0, letterSpacing: -0.2 }}>{children}</h2>
      {action}
    </div>
  );
}
