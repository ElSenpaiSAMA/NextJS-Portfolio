"use client";

import { Section, useSceneStore } from "../store/sceneStore";

const SANS = "var(--font-hanken), system-ui, sans-serif";

const NAV: { id: Section; label: string }[] = [
  { id: "hero",     label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about",    label: "About" },
];

export function Navigation3D() {
  const active = useSceneStore((s) => s.active);
  const setActive = useSceneStore((s) => s.setActive);

  return (
    <nav style={{
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
    }}>
      <button
        onClick={() => setActive("hero")}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#1B1A17",
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "17px", fontWeight: 400, letterSpacing: "-0.02em",
          pointerEvents: "auto", padding: 0,
        }}
      >
        MS
      </button>

      <div style={{ display: "flex", gap: "32px", pointerEvents: "auto" }}>
        {NAV.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            style={{
              background: "none", cursor: "pointer",
              fontFamily: SANS, fontSize: "13px", fontWeight: 500,
              letterSpacing: "0.01em",
              color: active === id ? "#1B1A17" : "#9C988E",
              padding: "4px 0",
              border: "none",
              borderBottom: active === id ? "1px solid #A8642E" : "1px solid transparent",
              transition: "color 0.25s, border-color 0.25s",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
