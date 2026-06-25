"use client";

import { useSceneStore } from "../../store/sceneStore";

const F = "var(--font-fraunces), Georgia, serif";
const S = "var(--font-hanken), system-ui, sans-serif";

export function HeroContent() {
  const setActive = useSceneStore((s) => s.setActive);

  return (
    <div style={{
      position: "absolute",
      top: "26%",
      left: "8%",
      maxWidth: "540px",
    }}>
      {/* Available */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "22px" }}>
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "#5B7F58", flexShrink: 0,
          boxShadow: "0 0 6px #5B7F58",
        }} />
        <span style={{ fontFamily: S, fontSize: "11px", color: "#5B7F58", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Available for work · Barcelona
        </span>
      </div>

      {/* Name */}
      <h1 style={{
        fontFamily: F,
        fontSize: "clamp(52px, 6.5vw, 88px)",
        fontWeight: 400,
        color: "#f0ede8",
        letterSpacing: "-0.03em",
        lineHeight: 0.95,
        margin: "0 0 16px",
        textShadow: "0 2px 40px rgba(0,0,0,0.9)",
      }}>
        Matias<br />Speroni
      </h1>

      {/* Role */}
      <p style={{
        fontFamily: S,
        fontSize: "13px",
        fontWeight: 500,
        color: "#9C988E",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        margin: "0 0 24px",
      }}>
        Backend &amp; Fullstack Developer
      </p>

      {/* Hairline */}
      <div style={{ width: "48px", height: "1px", background: "#A8642E", marginBottom: "24px", opacity: 0.6 }} />

      {/* Intro */}
      <p style={{
        fontFamily: S,
        fontSize: "15px",
        lineHeight: 1.7,
        color: "#6E6A62",
        margin: "0 0 12px",
      }}>
        I build production software end to end — from .NET and React
        to data pipelines and AI tools.
      </p>
      <p style={{ fontFamily: S, fontSize: "12px", color: "#4a4540", letterSpacing: "0.06em", margin: "0 0 32px" }}>
        Currently at <span style={{ color: "#A8642E" }}>Imagine</span> · Building <span style={{ color: "#A8642E" }}>Mira</span> · Studying <span style={{ color: "#9C988E" }}>Applied Data Science</span>
      </p>

      {/* CTAs */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => setActive("projects")}
          style={{
            padding: "11px 28px",
            background: "#f0ede8",
            color: "#1B1A17",
            border: "none",
            borderRadius: "2px",
            fontFamily: S,
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.01em",
          }}
        >
          View projects →
        </button>
        <button
          onClick={() => setActive("contact")}
          style={{
            padding: "11px 28px",
            background: "transparent",
            color: "#9C988E",
            border: "1px solid rgba(168,100,46,0.25)",
            borderRadius: "2px",
            fontFamily: S,
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.01em",
          }}
        >
          Get in touch
        </button>
      </div>
    </div>
  );
}
