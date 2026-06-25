"use client";

import { useCallback } from "react";
import { useSceneStore } from "../../store/sceneStore";

const F = "var(--font-fraunces), Georgia, serif";
const S = "var(--font-hanken), system-ui, sans-serif";

export function HeroContent() {
  const navigateTo  = useSceneStore((s) => s.navigateTo);
  const openContact = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-contact-drawer"));
  }, []);

  return (
    <div style={{ position: "absolute", top: "26%", left: "8%", maxWidth: "540px" }}>
      {/* Available indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "22px" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5B7F58", flexShrink: 0, boxShadow: "0 0 8px rgba(91,127,88,0.8)" }} />
        <span style={{ fontFamily: S, fontSize: "11px", color: "#5B7F58", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Available for work · Barcelona
        </span>
      </div>

      <h1 style={{
        fontFamily: F,
        fontSize: "clamp(52px, 6.5vw, 88px)",
        fontWeight: 400,
        color: "#F0EDE8",
        letterSpacing: "-0.03em",
        lineHeight: 0.95,
        margin: "0 0 16px",
      }}>
        Matias<br />Speroni
      </h1>

      <p style={{ fontFamily: S, fontSize: "13px", fontWeight: 500, color: "#5A5650", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 24px" }}>
        Backend &amp; Fullstack Developer
      </p>

      <div style={{ width: "48px", height: "1px", background: "#A8642E", marginBottom: "24px", boxShadow: "0 0 8px rgba(168,100,46,0.6)" }} />

      <p style={{ fontFamily: S, fontSize: "15px", lineHeight: 1.7, color: "#8A8680", margin: "0 0 12px" }}>
        I build production software end to end — from .NET and React to data pipelines and AI tools.
      </p>
      <p style={{ fontFamily: S, fontSize: "12px", color: "#5A5650", letterSpacing: "0.04em", margin: "0 0 32px" }}>
        Currently at <span style={{ color: "#A8642E" }}>Imagine</span> · Building <span style={{ color: "#A8642E" }}>Mira</span> · Studying <span style={{ color: "#6A6460" }}>Applied Data Science</span>
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => navigateTo("projects")}
          style={{
            padding: "11px 28px",
            background: "#A8642E",
            color: "#F0EDE8",
            border: "none",
            borderRadius: "2px",
            fontFamily: S,
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.01em",
            boxShadow: "0 0 22px rgba(168,100,46,0.45)",
          }}
        >
          View projects →
        </button>
        <button
          onClick={openContact}
          style={{
            padding: "11px 28px",
            background: "transparent",
            color: "#8A8680",
            border: "1px solid rgba(168,100,46,0.3)",
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
