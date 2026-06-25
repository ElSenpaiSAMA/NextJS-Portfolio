"use client";

import { projects } from "../../data/projects";

const F = "var(--font-fraunces), Georgia, serif";
const S = "var(--font-hanken), system-ui, sans-serif";

const PANEL: React.CSSProperties = {
  background: "rgba(251, 250, 247, 0.88)",
  border: "1px solid #E7E4DC",
  borderRadius: "3px",
  backdropFilter: "blur(10px)",
  overflow: "hidden",
};

export function ProjectsContent() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "80px 8% 24px", overflowY: "auto" }}>
      <div style={{ marginBottom: "24px", flexShrink: 0 }}>
        <h2 style={{ fontFamily: F, fontSize: "clamp(38px, 4.5vw, 60px)", fontWeight: 400, color: "#1B1A17", letterSpacing: "-0.03em", margin: "0 0 10px", lineHeight: 1 }}>Projects</h2>
        <div style={{ width: "44px", height: "1px", background: "#A8642E" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", flexShrink: 0 }}>
        {projects.map((p) => (
          <article key={p.id} style={PANEL}>
            {p.image && (
              <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", borderBottom: "1px solid #E7E4DC" }}>
                <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}
            <div style={{ padding: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                <p style={{ fontFamily: F, fontSize: "16px", color: "#1B1A17", letterSpacing: "-0.01em", margin: 0 }}>{p.title}</p>
                {p.inDevelopment && <span style={{ fontFamily: S, fontSize: "9px", color: "#9C988E", textTransform: "uppercase", letterSpacing: "0.08em" }}>WIP</span>}
              </div>
              <p style={{ fontFamily: S, fontSize: "11px", color: "#6E6A62", lineHeight: 1.55, marginBottom: "10px" }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} style={{ fontFamily: S, fontSize: "9px", color: "#9C988E", border: "1px solid #E7E4DC", borderRadius: "2px", padding: "2px 5px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "7px" }}>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: S, fontSize: "10px", color: "#6E6A62", textDecoration: "none", border: "1px solid #E7E4DC", padding: "3px 8px", borderRadius: "2px" }}>GitHub →</a>
                )}
                {p.siteLink && (
                  <a href={p.siteLink} target="_blank" rel="noopener noreferrer" style={{ fontFamily: S, fontSize: "10px", color: "#FBFAF7", textDecoration: "none", background: "#1B1A17", padding: "3px 8px", borderRadius: "2px" }}>View →</a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
