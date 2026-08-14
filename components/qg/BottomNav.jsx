import React from "react";
import { MOBILE_NAV } from "../../lib/qg/nav";

export default function BottomNav({ t, view, setView, setMobileOpen }) {
  return (
    <div
      className="qg-mobile-only-flex"
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: 60, zIndex: 30,
        background: t.surface, borderTop: `1px solid ${t.border}`,
        alignItems: "center", justifyContent: "space-around",
      }}
    >
      {MOBILE_NAV.map((item) => {
        const active = view === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => (item.id === "more" ? setMobileOpen(true) : setView(item.id))}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none", color: active ? t.primary : t.textFaint,
              fontSize: 10.5, fontWeight: 600, cursor: "pointer", flex: 1,
            }}
          >
            <Icon size={19} strokeWidth={2} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
