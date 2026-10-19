"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gridFor, glyphIndex, luma } from "../../lib/ascii";

export interface AsciiOptions {
  /** Cell width in CSS pixels (height is 1.6×). */
  cell?: number;
  /** Characters from empty to dense. */
  ramp: string;
  /** > 1 stretches mid-tones (dark footage keeps detail). */
  contrast?: number;
  /** Max frames per second while the source changes. */
  fps?: number;
}

interface AsciiCanvasProps extends AsciiOptions {
  /** The element to sample: a <video> (live) or an <img> (drawn once per resize). */
  source: RefObject<HTMLVideoElement | HTMLImageElement | null>;
  /** Redraw continuously (video). false: only on load/resize/seek. */
  live: boolean;
  className?: string;
}

// Mirrors --accent and --fg in globals.css (canvas can't read CSS variables cheaply per frame).
const MID = "#5b8cff";
const HIGH = "#ecebe6";

/** One glyph strip per colour: cell i of the strip holds ramp[i]. */
function buildAtlas(ramp: string, cellW: number, cellH: number, color: string, dpr: number): HTMLCanvasElement {
  const atlas = document.createElement("canvas");
  atlas.width = Math.ceil(ramp.length * cellW * dpr);
  atlas.height = Math.ceil(cellH * dpr);
  const ctx = atlas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  ctx.fillStyle = color;
  ctx.font = `${Math.round(cellH * 0.78)}px ui-monospace, "Geist Mono", Menlo, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < ramp.length; i++) ctx.fillText(ramp[i], i * cellW + cellW / 2, cellH / 2);
  return atlas;
}

/**
 * Renders an image or video as live ASCII art: the source is sampled into a
 * tiny cols×rows bitmap, each cell's brightness picks a glyph from the ramp,
 * and glyphs are blitted from a pre-rendered atlas (one drawImage per cell).
 * Bright cells use the foreground colour, mid-tones the accent. Caps at `fps`,
 * stops while off screen. Decorative: aria-hidden.
 */
export function AsciiCanvas({ source, live, ramp, cell = 11, contrast = 1.6, fps = 30, className = "" }: AsciiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const current = source.current;
    if (!canvas || !current) return;
    // Narrowed once here: the closures below keep the non-null type.
    const media: HTMLVideoElement | HTMLImageElement = current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sampler = document.createElement("canvas");
    const sample = sampler.getContext("2d", { willReadFrequently: true });
    if (!sample) return;

    let cols = 0;
    let rows = 0;
    let cellW = cell;
    let cellH = cell * 1.6;
    let atlasMid: HTMLCanvasElement | null = null;
    let atlasHigh: HTMLCanvasElement | null = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ({ cols, rows } = gridFor(width, height, cell));
      cellW = width / cols;
      cellH = height / rows;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      sampler.width = cols;
      sampler.height = rows;
      atlasMid = buildAtlas(ramp, cellW, cellH, MID, dpr);
      atlasHigh = buildAtlas(ramp, cellW, cellH, HIGH, dpr);
      draw();
    };

    const ready = () =>
      media instanceof HTMLVideoElement ? media.readyState >= 2 : media.complete && media.naturalWidth > 0;

    function draw() {
      if (!ctx || !sample || !atlasMid || !atlasHigh || !ready()) return;
      // Cover-fit the source into the grid, like object-fit: cover.
      const sw = media instanceof HTMLVideoElement ? media.videoWidth : (media as HTMLImageElement).naturalWidth;
      const sh = media instanceof HTMLVideoElement ? media.videoHeight : (media as HTMLImageElement).naturalHeight;
      const gridAspect = (cols * cellW) / (rows * cellH);
      const srcAspect = sw / sh;
      let sx = 0;
      let sy = 0;
      let cw = sw;
      let ch = sh;
      if (srcAspect > gridAspect) {
        cw = sh * gridAspect;
        sx = (sw - cw) / 2;
      } else {
        ch = sw / gridAspect;
        sy = (sh - ch) / 2;
      }
      sample.drawImage(media, sx, sy, cw, ch, 0, 0, cols, rows);
      const pixels = sample.getImageData(0, 0, cols, rows).data;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      const gw = cellW * dpr;
      const gh = cellH * dpr;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const p = (y * cols + x) * 4;
          const b = luma(pixels[p], pixels[p + 1], pixels[p + 2]);
          const i = glyphIndex(b, ramp.length, contrast);
          if (i === 0) continue;
          const atlas = b > 0.72 ? atlasHigh : atlasMid;
          ctx.drawImage(atlas, i * gw, 0, gw, gh, x * gw, y * gh, gw, gh);
        }
      }
    }

    // Loop only while visible and (for video) only when there's a new frame to show.
    let frame = 0;
    let last = 0;
    let visible = true;
    const interval = 1000 / fps;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!visible || now - last < interval) return;
      last = now;
      draw();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const events = ["loadeddata", "seeked", "load"] as const;
    events.forEach((e) => media.addEventListener(e, draw));
    if (live) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      events.forEach((e) => media.removeEventListener(e, draw));
    };
  }, [source, live, ramp, cell, contrast, fps]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
