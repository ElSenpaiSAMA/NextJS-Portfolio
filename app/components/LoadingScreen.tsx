"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1200);
    const hideTimer = setTimeout(() => setVisible(false), 1700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        backgroundColor: "var(--color-paper)",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <p
        className="font-serif font-normal mb-4"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(24px, 4vw, 36px)",
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
          animation: "fade-up-hero 0.5s ease forwards",
        }}
      >
        Matias Speroni
      </p>

      {/* Animated line */}
      <div
        style={{
          height: "1px",
          width: "48px",
          backgroundColor: "var(--color-accent)",
          animation: "loading-line 0.9s ease forwards",
        }}
      />

      <style>{`
        @keyframes loading-line {
          from { width: 0px; opacity: 0; }
          to   { width: 48px; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
