"use client";

import { useEffect, useRef } from "react";
import { READING_LINE, usePipeline } from "../../lib/pipeline-progress";

/**
 * The pipeline's track down the left of the page: a hairline, a glowing fill
 * that ends exactly at the reading line, and the "job" that rides it (a
 * sticky marker, so it stays at the reading line while the page scrolls
 * under it). Decorative; the stage nodes carry the states.
 */
export function Spine() {
  const { progress } = usePipeline();
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const bar = fill.current;
    if (!el || !bar) return;
    const top = el.getBoundingClientRect().top;
    const height = el.offsetHeight;
    const reached = Math.min(height, Math.max(0, window.innerHeight * READING_LINE - top));
    bar.style.height = `${progress > 0.995 ? height : reached}px`;
  }, [progress]);

  return (
    <div ref={track} aria-hidden="true" className="pointer-events-none absolute bottom-0 left-6 top-0 w-px sm:left-10">
      <div className="absolute inset-0 bg-line" />
      <div ref={fill} className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent/40 via-accent to-ok shadow-[0_0_12px_var(--accent)]" style={{ height: 0 }} />
      <div className="absolute inset-0">
        <div className="sticky top-[45vh] -translate-x-1/2">
          <span className="job -ml-[5.5px] block h-3 w-3 rounded-full bg-accent shadow-[0_0_0_4px_rgb(91_140_255/0.25),0_0_18px_var(--accent)]" />
        </div>
      </div>
    </div>
  );
}
