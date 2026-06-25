"use client";

import { useCallback } from "react";
import { useSceneStore } from "../../store/sceneStore";

const F = "var(--font-fraunces), Georgia, serif";
const S = "var(--font-hanken), system-ui, sans-serif";

export function HeroContent() {
  const setActive = useSceneStore((s) => s.setActive);
  const openContact = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-contact-drawer"));
  }, []);

  return (
    <div style={{ position: "absolute", top: "26%", left: "8%", maxWidth: "540px" }}>
      {/* Available */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "22px" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5B7F58", flexShrink: 0 }} />
        <span style={{ fontFamily: S, fontSize: "11px", color: "#5B7F58", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Available for work · Barcelona
        </span>
      </div>

      {/* Name */}
      <h1 style={{
        fontFamily: F,
        fontSize: "clamp(52px, 6.5vw, 88px)",
        fontWeight: 400,
        color: "#1B1A17",
        letterSpacing: "-0.03em",
        lineHeight: 0.95,
        margin: "0 0 16px",
      }}>
        Matias<br />Speroni
      </h1>

      {/* Role */}
      <p style={{ fontFamily: S, fontSize: "13px", fontWeight: 500, color: "#9C988E", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 24px" }}>
        Backend &amp; Fullstack Developer
      </p>

      <div style={{ width: "48px", height: "1px", background: "#A8642E", marginBottom: "24px" }} />

      {/* Intro */}
      <p style={{ fontFamily: S, fontSize: "15px", lineHeight: 1.7, color: "#6E6A62", margin: "0 0 12px" }}>
        I build production software end to end — from .NET and React to data pipelines and AI tools.
      </p>
      <p style={{ fontFamily: S, fontSize: "12px", color: "#9C988E", letterSpacing: "0.04em", margin: "0 0 32px" }}>
        Currently at <span style={{ color: "#A8642E" }}>Imagine</span> · Building <span style={{ color: "#A8642E" }}>Mira</span> · Studying <span style={{ color: "#6E6A62" }}>Applied Data Science</span>
      </p>

      {/* CTAs */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => setActive("projects")}
          style={{
            padding: "11px 28px", background: "#1B1A17", color: "#FBFAF7",
            border: "none", borderRadius: "2px", fontFamily: S,
            fontSize: "13px", fontWeight: 500, cursor: "pointer", letterSpacing: "0.01em",
          }}
        >
          View projects →
        </button>
        <button
          onClick={openContact}
          style={{
            padding: "11px 28px", background: "transparent", color: "#6E6A62",
            border: "1px solid #E7E4DC", borderRadius: "2px", fontFamily: S,
            fontSize: "13px", fontWeight: 500, cursor: "pointer", letterSpacing: "0.01em",
          }}
        >
          Get in touch
        </button>
      </div>
    </div>
  );
}
