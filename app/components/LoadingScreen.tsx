"use client";

import { useEffect, useRef, useState } from "react";

const FONT_SIZE = 90;
const PAD = 20;
// ms per path-length unit — lower = faster writing
const SPEED = 0.55;
// minimum duration per letter in ms
const MIN_DUR = 120;
// gap between "Matias" and "Speroni" in ms
const WORD_GAP = 150;

interface WordData {
  letters: string[]; // one SVG path `d` per letter
  viewBox: string;
}

async function buildPaths(): Promise<{ matias: WordData; speroni: WordData }> {
  const { parse } = await import("opentype.js");
  const res = await fetch("/fonts/DancingScript.ttf");
  const buf = await res.arrayBuffer();
  const font = parse(buf);
  const scale = FONT_SIZE / font.unitsPerEm;

  function wordData(text: string): WordData {
    const glyphs = font.stringToGlyphs(text);
    const letters: string[] = [];
    let x = PAD;

    for (let i = 0; i < glyphs.length; i++) {
      const g = glyphs[i];
      const path = g.getPath(x, FONT_SIZE + PAD, FONT_SIZE);
      letters.push(path.toPathData(2));
      x += (g.advanceWidth ?? 0) * scale;
      if (i < glyphs.length - 1) {
        x += font.getKerningValue(glyphs[i], glyphs[i + 1]) * scale;
      }
    }

    const full = font.getPath(text, PAD, FONT_SIZE + PAD, FONT_SIZE);
    const bb = full.getBoundingBox();
    const viewBox = [
      (bb.x1 - PAD).toFixed(1),
      (bb.y1 - PAD).toFixed(1),
      (bb.x2 - bb.x1 + PAD * 2).toFixed(1),
      (bb.y2 - bb.y1 + PAD * 2).toFixed(1),
    ].join(" ");

    return { letters, viewBox };
  }

  return { matias: wordData("Matias"), speroni: wordData("Speroni") };
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<typeof buildPaths>> | null>(null);
  const svg1 = useRef<SVGSVGElement>(null);
  const svg2 = useRef<SVGSVGElement>(null);
  // keep timeout refs so we can clean them up
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    buildPaths().then(setData).catch(() => {
      setFading(true);
      setTimeout(() => setVisible(false), 500);
    });
    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!data || !svg1.current || !svg2.current) return;

    const paths1 = Array.from(svg1.current.querySelectorAll<SVGPathElement>("path"));
    const paths2 = Array.from(svg2.current.querySelectorAll<SVGPathElement>("path"));

    // Hide all paths initially
    [...paths1, ...paths2].forEach((el) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    });

    // Animate letters one by one using setTimeout chains
    let elapsed = 0;

    function animateLetter(el: SVGPathElement, delay: number): number {
      const len = el.getTotalLength();
      const dur = Math.max(MIN_DUR, len * SPEED);
      const t = setTimeout(() => {
        el.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(0.3, 0, 0.2, 1)`;
        // Double rAF ensures the transition is applied after the dashoffset is set
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.style.strokeDashoffset = "0";
        }));
      }, delay);
      timers.current.push(t);
      return delay + dur;
    }

    // Word 1 — letter by letter
    for (const el of paths1) {
      elapsed = animateLetter(el, elapsed);
    }

    // Word 2 — starts after word 1 + gap
    elapsed += WORD_GAP;
    for (const el of paths2) {
      elapsed = animateLetter(el, elapsed);
    }

    // Fade out after everything is drawn
    const tFade = setTimeout(() => setFading(true), elapsed + 350);
    const tHide = setTimeout(() => setVisible(false), elapsed + 850);
    timers.current.push(tFade, tHide);
  }, [data]);

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
      {data && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <svg
            ref={svg1}
            viewBox={data.matias.viewBox}
            style={{ width: "clamp(160px, 38vw, 300px)", height: "auto", display: "block" }}
          >
            {data.matias.letters.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#1B1A17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </svg>

          <svg
            ref={svg2}
            viewBox={data.speroni.viewBox}
            style={{ width: "clamp(180px, 44vw, 340px)", height: "auto", display: "block", marginTop: "-8px" }}
          >
            {data.speroni.letters.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#1B1A17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}
