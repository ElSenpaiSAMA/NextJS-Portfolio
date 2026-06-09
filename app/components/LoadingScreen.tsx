"use client";

import { useState, useEffect } from "react";

// ─── timing ─────────────────────────────────────────────
const LETTER_DELAY = 48;   // ms stagger between letters
const LETTER_DUR   = 580;  // ms per letter slide
const LINE_START   = 280;  // ms after last letter before hairline draws
const LINE_DUR     = 500;  // ms for hairline to extend
const HOLD         = 350;  // ms to hold after hairline
const EXIT_DUR     = 820;  // ms for curtain to lift
// ────────────────────────────────────────────────────────

const WORD1 = "Matias";
const WORD2 = "Speroni";
const TOTAL_LETTERS = WORD1.length + WORD2.length;
const LAST_LETTER_END = TOTAL_LETTERS * LETTER_DELAY + LETTER_DUR;
const LINE_END = LAST_LETTER_END + LINE_START + LINE_DUR;
const EXIT_START = LINE_END + HOLD;

type Phase = "init" | "in" | "line" | "exit" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("init");

  useEffect(() => {
    // Double rAF: ensure first paint has letters hidden before animating
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setPhase("in"))
    );

    const t1 = setTimeout(() => setPhase("line"), LAST_LETTER_END + LINE_START);
    const t2 = setTimeout(() => setPhase("exit"), EXIT_START);
    const t3 = setTimeout(() => setPhase("done"), EXIT_START + EXIT_DUR);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  function letterStyle(index: number): React.CSSProperties {
    const revealed = phase === "in" || phase === "line" || phase === "exit";
    return {
      display: "inline-block",
      fontFamily: "var(--font-serif)",
      fontSize: "clamp(46px, 7.5vw, 86px)",
      fontWeight: 400,
      fontStyle: "italic",
      color: "#FBFAF7",
      letterSpacing: "-0.025em",
      lineHeight: 1,
      transform: revealed ? "translateY(0)" : "translateY(115%)",
      transition: revealed
        ? `transform ${LETTER_DUR}ms cubic-bezier(0.16, 1, 0.3, 1) ${index * LETTER_DELAY}ms`
        : "none",
    };
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#1B1A17",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        // Curtain lifts up on exit
        transform: phase === "exit" ? "translateY(-100%)" : "translateY(0)",
        transition:
          phase === "exit"
            ? `transform ${EXIT_DUR}ms cubic-bezier(0.76, 0, 0.24, 1)`
            : "none",
      }}
    >
      {/* Name */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

        {/* "Matias" */}
        <div style={{ display: "flex" }}>
          {WORD1.split("").map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                lineHeight: 1.15,
                // Extra room above so dots/diacritics aren't clipped by overflow:hidden
                paddingTop: "0.3em",
                marginTop: "-0.3em",
              }}
            >
              <span style={letterStyle(i)}>{char}</span>
            </span>
          ))}
        </div>

        {/* "Speroni" */}
        <div style={{ display: "flex", marginTop: "2px" }}>
          {WORD2.split("").map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                lineHeight: 1.15,
                paddingTop: "0.3em",
                marginTop: "-0.3em",
              }}
            >
              <span style={letterStyle(WORD1.length + i)}>{char}</span>
            </span>
          ))}
        </div>

        {/* Hairline that draws in after the name */}
        <div
          style={{
            height: "1px",
            background: "rgba(251, 250, 247, 0.25)",
            marginTop: "20px",
            transformOrigin: "left center",
            transform:
              phase === "line" || phase === "exit" ? "scaleX(1)" : "scaleX(0)",
            transition:
              phase === "line"
                ? `transform ${LINE_DUR}ms cubic-bezier(0.76, 0, 0.24, 1)`
                : "none",
            // Match the wider word width
            width: "clamp(200px, 37vw, 440px)",
          }}
        />
      </div>
    </div>
  );
}
