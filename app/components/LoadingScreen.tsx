"use client";

import { useEffect, useRef, useState } from "react";

interface WordPaths {
  matias: { d: string; viewBox: string };
  speroni: { d: string; viewBox: string };
}

const FONT_SIZE = 90;
const PAD = 20;

async function buildPaths(): Promise<WordPaths> {
  const { parse } = await import("opentype.js");
  const res = await fetch("/fonts/DancingScript.ttf");
  const buf = await res.arrayBuffer();
  const font = parse(buf);

  function wordData(text: string) {
    const path = font.getPath(text, PAD, FONT_SIZE + PAD, FONT_SIZE);
    const bb = path.getBoundingBox();
    const vbX = (bb.x1 - PAD).toFixed(1);
    const vbY = (bb.y1 - PAD).toFixed(1);
    const vbW = (bb.x2 - bb.x1 + PAD * 2).toFixed(1);
    const vbH = (bb.y2 - bb.y1 + PAD * 2).toFixed(1);
    return { d: path.toPathData(2), viewBox: `${vbX} ${vbY} ${vbW} ${vbH}` };
  }

  return { matias: wordData("Matias"), speroni: wordData("Speroni") };
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [paths, setPaths] = useState<WordPaths | null>(null);
  const ref1 = useRef<SVGPathElement>(null);
  const ref2 = useRef<SVGPathElement>(null);

  // Load font and generate paths on mount
  useEffect(() => {
    buildPaths().then(setPaths).catch(() => {
      // If font fails to load, skip loading screen after a short delay
      setTimeout(() => setFading(true), 300);
      setTimeout(() => setVisible(false), 800);
    });
  }, []);

  // Start animations once paths are rendered
  useEffect(() => {
    if (!paths || !ref1.current || !ref2.current) return;

    const p1 = ref1.current;
    const p2 = ref2.current;
    const len1 = p1.getTotalLength();
    const len2 = p2.getTotalLength();

    const DUR1 = 1500;  // ms — "Matias"
    const GAP  = 180;
    const DUR2 = 1700;  // ms — "Speroni"
    const TOTAL = DUR1 + GAP + DUR2;

    // Prepare word 1 — hidden at full dashoffset
    p1.style.strokeDasharray = `${len1}`;
    p1.style.strokeDashoffset = `${len1}`;

    // Prepare word 2
    p2.style.strokeDasharray = `${len2}`;
    p2.style.strokeDashoffset = `${len2}`;

    // Animate word 1 immediately
    requestAnimationFrame(() => requestAnimationFrame(() => {
      p1.style.transition = `stroke-dashoffset ${DUR1}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      p1.style.strokeDashoffset = "0";
    }));

    // Animate word 2 after word 1 finishes
    const t2 = setTimeout(() => {
      p2.style.transition = `stroke-dashoffset ${DUR2}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      p2.style.strokeDashoffset = "0";
    }, DUR1 + GAP);

    // Fade out
    const tFade = setTimeout(() => setFading(true), TOTAL + 400);
    const tHide = setTimeout(() => setVisible(false), TOTAL + 900);

    return () => {
      clearTimeout(t2);
      clearTimeout(tFade);
      clearTimeout(tHide);
    };
  }, [paths]);

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
      {paths && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {/* "Matias" */}
          <svg
            viewBox={paths.matias.viewBox}
            style={{ width: "clamp(160px, 42vw, 320px)", height: "auto", display: "block" }}
          >
            <path
              ref={ref1}
              d={paths.matias.d}
              fill="none"
              stroke="#1B1A17"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* "Speroni" — slight negative margin to keep cursive line spacing */}
          <svg
            viewBox={paths.speroni.viewBox}
            style={{ width: "clamp(180px, 48vw, 360px)", height: "auto", display: "block", marginTop: "-10px" }}
          >
            <path
              ref={ref2}
              d={paths.speroni.d}
              fill="none"
              stroke="#1B1A17"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Accent underline — draws after both words finish */}
          <div
            style={{
              height: "1px",
              width: "0",
              background: "#A8642E",
              marginTop: "4px",
              animation: `ms-line 0.4s ease forwards ${(1500 + 180 + 1700 + 100) / 1000}s`,
            }}
          />
          <style>{`
            @keyframes ms-line { to { width: 100%; } }
          `}</style>
        </div>
      )}
    </div>
  );
}
