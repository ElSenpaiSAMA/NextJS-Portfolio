"use client";

import { useState } from "react";

const F = "var(--font-fraunces), Georgia, serif";
const S = "var(--font-hanken), system-ui, sans-serif";

const PANEL: React.CSSProperties = {
  background: "rgba(10, 9, 16, 0.84)",
  border: "1px solid rgba(168,100,46,0.22)",
  borderRadius: "3px",
  backdropFilter: "blur(14px)",
};

const STACK_TABS = [
  {
    key: "fullstack",
    label: "Backend & Fullstack",
    items: [".NET", "C#", "React", "Next.js", "TypeScript", "FastAPI", "SQL Server", "PostgreSQL", "Supabase", "Firebase", "Docker", "Git"],
  },
  {
    key: "data",
    label: "Data & AI",
    items: ["Python", "Pandas", "NumPy", "Jupyter", "Ollama", "n8n", "GitHub Actions", "SQL Server", "PostgreSQL", "Supabase", "Firebase"],
  },
];

export function AboutContent() {
  const [activeTab, setActiveTab] = useState<"fullstack" | "data">("fullstack");
  const items = STACK_TABS.find((t) => t.key === activeTab)?.items ?? [];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "80px 8% 24px", overflowY: "auto" }}>
      <div style={{ marginBottom: "24px", flexShrink: 0 }}>
        <h2 style={{ fontFamily: F, fontSize: "clamp(38px, 4.5vw, 60px)", fontWeight: 400, color: "#F0EDE8", letterSpacing: "-0.03em", margin: "0 0 10px", lineHeight: 1 }}>About</h2>
        <div style={{ width: "36px", height: "1px", background: "#A8642E", boxShadow: "0 0 8px rgba(168,100,46,0.6)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", flexShrink: 0 }}>
        {/* Bio panel */}
        <div style={{ ...PANEL, padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(168,100,46,0.35)", flexShrink: 0 }}>
              <img src="/104552415.jpg" alt="Matias" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <h3 style={{ fontFamily: F, fontSize: "20px", color: "#F0EDE8", fontWeight: 400, letterSpacing: "-0.02em", margin: 0 }}>Matias Speroni</h3>
              <p style={{ fontFamily: S, fontSize: "10px", color: "#A8642E", textTransform: "uppercase", letterSpacing: "0.1em", margin: "3px 0 0" }}>Barcelona, Spain</p>
            </div>
          </div>
          <p style={{ fontFamily: S, fontSize: "13px", color: "#8A8680", lineHeight: 1.7, marginBottom: "10px" }}>
            Backend &amp; fullstack developer specialized in .NET and React. Working at Imagine building data and AI products end to end.
          </p>
          <p style={{ fontFamily: S, fontSize: "13px", color: "#8A8680", lineHeight: 1.7, marginBottom: "10px" }}>
            Studying Applied Data Science. Solid understanding of Docker and CI/CD.
          </p>
          <p style={{ fontFamily: S, fontSize: "13px", color: "#8A8680", lineHeight: 1.7 }}>
            I love technology, cinema and music. Passionate about traveling and discovering new cultures.
          </p>
          <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid rgba(168,100,46,0.15)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { label: "Based in", value: "Barcelona, Spain" },
              { label: "Role",     value: "Backend & Fullstack" },
              { label: "Focus",    value: "Data & AI" },
              { label: "Lang",     value: "ES · EN" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: S, fontSize: "10px", color: "#4A4640", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>{label}</p>
                <p style={{ fontFamily: S, fontSize: "12px", color: "#F0EDE8", fontWeight: 500 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack panel */}
        <div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            {STACK_TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as "fullstack" | "data")}
                style={{
                  fontFamily: S, fontSize: "11px", fontWeight: 500,
                  padding: "5px 12px", borderRadius: "2px", cursor: "pointer",
                  transition: "all 0.15s",
                  background:  activeTab === key ? "#A8642E" : "transparent",
                  color:       activeTab === key ? "#F0EDE8" : "#4A4640",
                  border:      activeTab === key ? "1px solid #A8642E" : "1px solid rgba(168,100,46,0.2)",
                  boxShadow:   activeTab === key ? "0 0 12px rgba(168,100,46,0.35)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "7px" }}>
            {items.map((name) => (
              <div key={name} style={{ ...PANEL, padding: "11px 8px", textAlign: "center" }}>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#A8642E", margin: "0 auto 6px", boxShadow: "0 0 6px rgba(168,100,46,0.9)" }} />
                <p style={{ fontFamily: S, fontSize: "11px", color: "#D8D4CE", fontWeight: 500, margin: 0 }}>{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
