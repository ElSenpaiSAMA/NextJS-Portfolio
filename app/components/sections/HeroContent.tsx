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
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* Readability gradient behind content */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 14% 50%, rgba(5,5,10,0.88) 0%, rgba(5,5,10,0.45) 52%, transparent 78%)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "absolute", top: "24%", left: "8%", maxWidth: "520px",
        pointerEvents: "auto",
      }}>
        {/* Available */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
          <span style={{
            width: "5px", height: "5px", borderRadius: "50%",
            background: "#5B7F58", flexShrink: 0,
            boxShadow: "0 0 8px rgba(91,127,88,0.9)",
          }} />
          <span style={{
            fontFamily: S, fontSize: "10px", color: "#5B7F58",
            letterSpacing: "0.12em", textTransform: "uppercase",
          }}>
            Available for work · Barcelona
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: F,
          fontSize: "clamp(56px, 7vw, 92px)",
          fontWeight: 400,
          color: "#F0EDE8",
          letterSpacing: "-0.035em",
          lineHeight: 0.92,
          margin: "0 0 20px",
        }}>
          Matias<br />Speroni
        </h1>

        {/* Role */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <div style={{
            width: "32px", height: "1px",
            background: "#A8642E",
            boxShadow: "0 0 6px rgba(168,100,46,0.7)",
          }} />
          <p style={{
            fontFamily: S, fontSize: "11px", fontWeight: 500,
            color: "#5A5650", letterSpacing: "0.14em", textTransform: "uppercase",
            margin: 0,
          }}>
            Backend &amp; Fullstack Developer
          </p>
        </div>

        {/* Intro */}
        <p style={{
          fontFamily: S, fontSize: "15px", lineHeight: 1.72, color: "#8A8680",
          margin: "0 0 10px",
        }}>
          I build production software end to end — from .NET and React to data pipelines and AI tools.
        </p>
        <p style={{
          fontFamily: S, fontSize: "12px", color: "#4A4640",
          letterSpacing: "0.03em", margin: "0 0 36px",
        }}>
          Currently at <span style={{ color: "#A8642E" }}>Imagine</span>
          {" "}· Building <span style={{ color: "#A8642E" }}>Mira</span>
          {" "}· Studying <span style={{ color: "#6A6460" }}>Applied Data Science</span>
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigateTo("projects")}
            style={{
              padding: "12px 30px",
              background: "#A8642E",
              color: "#F0EDE8",
              border: "none",
              borderRadius: "2px",
              fontFamily: S, fontSize: "13px", fontWeight: 500,
              cursor: "pointer", letterSpacing: "0.02em",
              boxShadow: "0 0 28px rgba(168,100,46,0.5)",
            }}
          >
            View work →
          </button>
          <button
            onClick={openContact}
            style={{
              padding: "12px 30px",
              background: "transparent",
              color: "#7A7670",
              border: "1px solid rgba(168,100,46,0.28)",
              borderRadius: "2px",
              fontFamily: S, fontSize: "13px", fontWeight: 500,
              cursor: "pointer", letterSpacing: "0.02em",
            }}
          >
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
}
