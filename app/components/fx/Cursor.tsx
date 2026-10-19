"use client";

import { useEffect, useRef } from "react";
import { DESKTOP_MOTION_QUERY, useMediaQuery } from "../../lib/motion";

/**
 * A text-caret cursor: a block that trails the pointer with a little inertia
 * and, over links/buttons, widens into a pill with a label (`data-cursor`
 * on the element, e.g. "open", "view"; "→" by default). Uses
 * mix-blend-difference so it reads on dark and light. Desktop pointers with
 * motion only; the native cursor stays everywhere else.
 */
export function Cursor() {
  const enabled = useMediaQuery(DESKTOP_MOTION_QUERY);
  const caret = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = caret.current;
    const text = label.current;
    if (!enabled || !el || !text) return;
    document.documentElement.dataset.customCursor = "";

    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let frame = 0;
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest<HTMLElement>("a, button, [data-cursor], input, textarea, label");
      const typing = target?.matches("input, textarea");
      el.dataset.state = target ? (typing ? "text" : "link") : "idle";
      text.textContent = target && !typing ? (target.dataset.cursor ?? "→") : "";
    };
    const onLeave = () => {
      x = -100;
      y = -100;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      delete document.documentElement.dataset.customCursor;
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={caret}
      aria-hidden="true"
      data-state="idle"
      className="pointer-events-none fixed left-0 top-0 z-[90] flex h-6 w-3 items-center justify-center bg-white font-mono text-[11px] font-medium text-black mix-blend-difference transition-[width,height,border-radius] duration-200 [transition-timing-function:var(--ease-out)] data-[state=link]:h-9 data-[state=link]:w-16 data-[state=link]:rounded-full data-[state=text]:h-7 data-[state=text]:w-0.5"
    >
      <span ref={label} />
    </div>
  );
}
