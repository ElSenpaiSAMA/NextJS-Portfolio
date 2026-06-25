"use client";

import { useSceneStore, type Section } from "../store/sceneStore";

const SERIF = "var(--font-fraunces), Georgia, serif";
const SANS  = "var(--font-hanken), system-ui, sans-serif";

const DOTS: { id: Section; label: string }[] = [
  { id: "hero",     label: "Home"     },
  { id: "projects", label: "Projects" },
  { id: "about",    label: "About"    },
];

export function SiteChrome() {
  const active     = useSceneStore((s) => s.active);
  const navigateTo = useSceneStore((s) => s.navigateTo);

  return (
    <>
      {/* ── Logo top-left ── */}
      <button
        onClick={() => navigateTo("hero")}
        style={{
          position: "fixed", top: "24px", left: "28px", zIndex: 20,
          background: "none", border: "none", padding: 0, cursor: "pointer",
          fontFamily: SERIF, fontSize: "18px", fontWeight: 400,
          color: "#F0EDE8", letterSpacing: "-0.02em",
          textShadow: "0 0 16px rgba(168,100,46,0.65)",
          pointerEvents: "auto",
        }}
      >
        MS
      </button>

      {/* ── Section dots — right center ── */}
      <nav
        aria-label="Sections"
        style={{
          position: "fixed", right: "28px", top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "18px",
          pointerEvents: "auto",
        }}
      >
        {DOTS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => navigateTo(id)}
              title={label}
              aria-label={label}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "none", border: "none", cursor: "pointer", padding: 0,
              }}
            >
              {/* Label — only visible on hover via CSS (handled via title tooltip) */}
              <span style={{
                fontFamily: SANS, fontSize: "10px", letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: isActive ? "#A8642E" : "#3A3830",
                transition: "color 0.3s",
              }}>
                {label}
              </span>

              {/* Dot / pill */}
              <div style={{
                width: isActive ? "3px" : "3px",
                height: isActive ? "28px" : "6px",
                borderRadius: "2px",
                background: isActive ? "#A8642E" : "rgba(168,100,46,0.28)",
                boxShadow: isActive ? "0 0 10px rgba(168,100,46,0.8)" : "none",
                transition: "height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s, box-shadow 0.3s",
              }} />
            </button>
          );
        })}
      </nav>
    </>
  );
}
