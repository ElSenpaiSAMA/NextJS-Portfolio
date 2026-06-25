"use client";

import { useSceneStore, type Section } from "../store/sceneStore";

const SANS  = "var(--font-hanken), system-ui, sans-serif";
const SERIF = "var(--font-fraunces), Georgia, serif";

const NAV: { id: Section; label: string }[] = [
  { id: "hero",     label: "Home"     },
  { id: "projects", label: "Projects" },
  { id: "about",    label: "About"    },
];

export function Navigation3D() {
  const active     = useSceneStore((s) => s.active);
  const navigateTo = useSceneStore((s) => s.navigateTo);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 10,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 32px",
      pointerEvents: "none",
    }}>
      <button
        onClick={() => navigateTo("hero")}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#F0EDE8",
          fontFamily: SERIF,
          fontSize: "17px", fontWeight: 400, letterSpacing: "-0.02em",
          pointerEvents: "auto", padding: 0,
          textShadow: "0 0 14px rgba(168,100,46,0.7)",
        }}
      >
        MS
      </button>

      <div style={{ display: "flex", gap: "32px", pointerEvents: "auto" }}>
        {NAV.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => navigateTo(id)}
            style={{
              background: "none", cursor: "pointer",
              fontFamily: SANS, fontSize: "13px", fontWeight: 500,
              letterSpacing: "0.01em",
              color: active === id ? "#F0EDE8" : "#4A4640",
              padding: "4px 0",
              border: "none",
              borderBottom: active === id ? "1px solid #A8642E" : "1px solid transparent",
              transition: "color 0.3s, border-color 0.3s",
              textShadow: active === id ? "0 0 10px rgba(168,100,46,0.5)" : "none",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
