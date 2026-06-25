"use client";

import { useState } from "react";

const F = "var(--font-fraunces), Georgia, serif";
const S = "var(--font-hanken), system-ui, sans-serif";

const STACK_TABS = [
  {
    key: "fullstack",
    label: "Backend & Fullstack",
    items: [".NET", "C#", "React", "Next.js", "TypeScript", "FastAPI", "SQL Server", "PostgreSQL", "Supabase", "Firebase", "Docker", "Git"],
  },
  {
    key: "data",
    label: "Data & AI",
    items: ["Python", "Pandas", "NumPy", "Jupyter", "Ollama", "n8n", "GitHub Actions", "SQL Server", "PostgreSQL", "Supabase"],
  },
];

const FACTS = [
  { label: "Based in", value: "Barcelona, Spain" },
  { label: "Role",     value: "Backend & Fullstack" },
  { label: "Focus",    value: "Data & AI" },
  { label: "Lang",     value: "ES · EN" },
];

export function AboutContent() {
  const [activeTab, setActiveTab] = useState<"fullstack" | "data">("fullstack");
  const items = STACK_TABS.find((t) => t.key === activeTab)?.items ?? [];

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Readability gradient — left and bottom edges */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 60%, rgba(5,5,10,0.7) 0%, rgba(5,5,10,0.4) 55%, transparent 85%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        padding: "72px 7% 28px",
        display: "flex", flexDirection: "column",
        pointerEvents: "auto",
      }}>
        {/* Header */}
        <div style={{ marginBottom: "24px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
            <h2 style={{
              fontFamily: F, fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 400,
              color: "#F0EDE8", letterSpacing: "-0.03em", margin: 0, lineHeight: 1,
            }}>
              About
            </h2>
            <div style={{
              flex: 1, height: "1px",
              background: "linear-gradient(to right, rgba(168,100,46,0.6), transparent)",
            }} />
          </div>
        </div>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", flex: 1, minHeight: 0 }}>

          {/* ── Left: Bio ── */}
          <div>
            {/* Avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
              <div style={{
                width: "54px", height: "54px", borderRadius: "50%", overflow: "hidden",
                border: "1px solid rgba(168,100,46,0.35)", flexShrink: 0,
                boxShadow: "0 0 20px rgba(168,100,46,0.15)",
              }}>
                <img src="/104552415.jpg" alt="Matias" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <h3 style={{
                  fontFamily: F, fontSize: "22px", color: "#F0EDE8",
                  fontWeight: 400, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.1,
                }}>
                  Matias Speroni
                </h3>
                <p style={{
                  fontFamily: S, fontSize: "10px", color: "#A8642E",
                  textTransform: "uppercase", letterSpacing: "0.1em", margin: "4px 0 0",
                }}>
                  Barcelona, Spain
                </p>
              </div>
            </div>

            <p style={{ fontFamily: S, fontSize: "13px", color: "#8A8680", lineHeight: 1.75, marginBottom: "12px" }}>
              Backend &amp; fullstack developer specialized in .NET and React.
              Working at <span style={{ color: "#A8642E" }}>Imagine</span> building data and AI products end to end.
            </p>
            <p style={{ fontFamily: S, fontSize: "13px", color: "#8A8680", lineHeight: 1.75, marginBottom: "12px" }}>
              Studying Applied Data Science. Solid understanding of Docker and CI/CD.
            </p>
            <p style={{ fontFamily: S, fontSize: "13px", color: "#6A6460", lineHeight: 1.75, marginBottom: "28px" }}>
              I love technology, cinema and music. Passionate about traveling and discovering new cultures.
            </p>

            {/* Key facts */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px",
              paddingTop: "18px",
              borderTop: "1px solid rgba(168,100,46,0.12)",
            }}>
              {FACTS.map(({ label, value }) => (
                <div key={label}>
                  <p style={{
                    fontFamily: S, fontSize: "9px", color: "#3A3830",
                    textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px",
                  }}>{label}</p>
                  <p style={{ fontFamily: S, fontSize: "13px", color: "#D0CCC6", fontWeight: 500 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Stack ── */}
          <div>
            {/* Tab switcher */}
            <div style={{ display: "flex", gap: "2px", marginBottom: "18px" }}>
              {STACK_TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as "fullstack" | "data")}
                  style={{
                    fontFamily: S, fontSize: "11px", fontWeight: 500,
                    padding: "6px 14px", cursor: "pointer",
                    transition: "all 0.18s",
                    background:  activeTab === key ? "rgba(168,100,46,0.15)" : "transparent",
                    color:       activeTab === key ? "#A8642E"               : "#3A3830",
                    border:      "1px solid",
                    borderColor: activeTab === key ? "rgba(168,100,46,0.4)"  : "rgba(168,100,46,0.1)",
                    borderRadius: "2px",
                    boxShadow:   activeTab === key ? "0 0 14px rgba(168,100,46,0.15)" : "none",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Skill chips — no panel wrapper */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {items.map((name) => (
                <span key={name} style={{
                  fontFamily: S, fontSize: "12px", color: "#C8C4BC", fontWeight: 500,
                  padding: "6px 12px",
                  border: "1px solid rgba(168,100,46,0.18)",
                  borderRadius: "2px",
                  letterSpacing: "0.01em",
                  position: "relative",
                }}>
                  {/* Amber dot */}
                  <span style={{
                    display: "inline-block",
                    width: "3px", height: "3px", borderRadius: "50%",
                    background: "#A8642E",
                    boxShadow: "0 0 5px rgba(168,100,46,0.9)",
                    marginRight: "7px",
                    verticalAlign: "middle",
                  }} />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
