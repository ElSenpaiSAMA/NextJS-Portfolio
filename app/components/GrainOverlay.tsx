"use client";

import { useEffect, useRef } from "react";

/** Monochrome fractal noise tile, inlined so no asset request is needed. */
const NOISE_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
      "<filter id='n'>" +
      "<feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='2' stitchTiles='stitch'/>" +
      "<feColorMatrix type='saturate' values='0'/>" +
      "</filter>" +
      "<rect width='100%' height='100%' filter='url(#n)'/>" +
      "</svg>",
  );

/** How often the grain jitters, in ms. ~12fps reads as film grain. */
const JITTER_INTERVAL_MS = 80;
/** Max background-position offset per tick, in px. */
const JITTER_RANGE_PX = 6;

/**
 * Full-viewport animated film-grain layer.
 *
 * z-index 50 puts it above all page content while leaving headroom for the
 * future custom cursor, which will mount above it (z-index > 50). It never
 * intercepts interaction (`pointer-events-none`).
 */
export function GrainOverlay() {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = grainRef.current;
    if (!node) return;

    // Mutate style directly — no React re-renders for a cosmetic jitter.
    const interval = window.setInterval(() => {
      const x = Math.round((Math.random() * 2 - 1) * JITTER_RANGE_PX);
      const y = Math.round((Math.random() * 2 - 1) * JITTER_RANGE_PX);
      node.style.backgroundPosition = `${x}px ${y}px`;
    }, JITTER_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      ref={grainRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
        opacity: "var(--grain-opacity)",
        mixBlendMode: "overlay",
      }}
    />
  );
}
