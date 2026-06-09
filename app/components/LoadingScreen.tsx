"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // "Matias" draws ~0.1s–1.1s, "Speroni" draws ~1.2s–2.4s, accent line ~2.5s
    const fadeTimer = setTimeout(() => setFading(true), 2800);
    const hideTimer = setTimeout(() => setVisible(false), 3300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FBFAF7",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <svg
        viewBox="0 0 360 170"
        width="360"
        height="170"
        style={{ overflow: "visible" }}
        aria-label="Matias Speroni"
      >
        <style>{`
          .ms-line-1 {
            font-family: var(--font-dancing), cursive;
            font-size: 72px;
            font-weight: 600;
            fill: none;
            stroke: #1B1A17;
            stroke-width: 1px;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: ms-draw 1.1s ease-in-out forwards 0.1s;
          }
          .ms-line-2 {
            font-family: var(--font-dancing), cursive;
            font-size: 72px;
            font-weight: 600;
            fill: none;
            stroke: #1B1A17;
            stroke-width: 1px;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 2500;
            stroke-dashoffset: 2500;
            animation: ms-draw 1.2s ease-in-out forwards 1.3s;
          }
          .ms-accent {
            stroke: #A8642E;
            stroke-width: 1.5px;
            stroke-linecap: round;
            fill: none;
            stroke-dasharray: 80;
            stroke-dashoffset: 80;
            animation: ms-draw 0.4s ease forwards 2.6s;
          }
          @keyframes ms-draw {
            to { stroke-dashoffset: 0; }
          }
        `}</style>

        {/* First name */}
        <text x="180" y="80" textAnchor="middle" className="ms-line-1">
          Matias
        </text>

        {/* Last name */}
        <text x="180" y="152" textAnchor="middle" className="ms-line-2">
          Speroni
        </text>

        {/* Accent underline */}
        <line x1="140" y1="163" x2="220" y2="163" className="ms-accent" />
      </svg>
    </div>
  );
}
