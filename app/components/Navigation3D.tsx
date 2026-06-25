"use client";

import { Section, useSceneStore } from "../store/sceneStore";

const NAV: { id: Section; label: string }[] = [
  { id: "hero",     label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about",    label: "About" },
  { id: "contact",  label: "Contact" },
];

export function Navigation3D() {
  const active = useSceneStore((s) => s.active);
  const setActive = useSceneStore((s) => s.setActive);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 32px",
        pointerEvents: "none",
      }}
    >
      {/* Brand */}
      <button
        onClick={() => setActive("hero")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#f0ede8",
          fontSize: "15px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          pointerEvents: "auto",
          padding: 0,
        }}
      >
        MS
      </button>

      {/* Links */}
      <div style={{ display: "flex", gap: "32px", pointerEvents: "auto" }}>
        {NAV.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: active === id ? "#f0ede8" : "#4a4a6a",
              padding: "4px 0",
              borderBottom: active === id ? "1px solid rgba(200,200,255,0.5)" : "1px solid transparent",
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
