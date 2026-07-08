"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { tokens } from "../lib/tokens";

type CursorVariant = "default" | "link" | "view";

const DOT_SIZE = 6;
const RING_SIZE = 36;

/** Ring scale per variant — "view" grows enough to frame the label. */
const RING_SCALE: Record<CursorVariant, number> = {
  default: 1,
  link: 1.8,
  view: 2.6,
};

const COARSE_QUERY = "(pointer: coarse)";

function subscribeToCoarsePointer(callback: () => void): () => void {
  const mq = window.matchMedia(COARSE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * Custom cursor: a small dot tracking the pointer 1:1 plus a larger ring
 * trailing it on a spring. Interactive elements opt into variants via
 * `data-cursor="link"` (ring grows) or `data-cursor="view"` (ring grows
 * further and shows a label — optionally overridden with
 * `data-cursor-label`; meant for project cards).
 *
 * z-index 60 puts it above GrainOverlay and the contact drawer (both z-50) —
 * the cursor must overlay everything. It never intercepts interaction
 * (`pointer-events: none`).
 */
export function Cursor() {
  // `pointer: coarse` is only knowable in the browser. useSyncExternalStore's
  // server snapshot reports coarse (→ render null) until hydration confirms a
  // fine pointer, avoiding an SSR mismatch; on touch devices the cursor never
  // renders at all. It also reacts live if the primary pointer changes.
  const isCoarse = useSyncExternalStore(
    subscribeToCoarsePointer,
    () => window.matchMedia(COARSE_QUERY).matches,
    () => true,
  );
  const enabled = !isCoarse;
  // Hidden until the first pointermove, and again when the pointer leaves
  // the window.
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // The ring follows the same source values through a softer spring, which
  // produces the trailing/inertia effect relative to the dot.
  const ringX = useSpring(mouseX, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 260, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    // Hide the native cursor only while the custom one is actually mounted
    // and active (see globals.css). `cursor: none` does not affect keyboard
    // focus outlines — those render independently of the cursor property.
    document.body.classList.add("cursor-none-active");

    // pointermove (not mousemove) so mouse/pen/touch are handled uniformly,
    // even though the component never mounts on coarse pointers.
    const onPointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
    };

    // Event delegation: a single global listener resolves the variant from
    // the nearest [data-cursor] ancestor of whatever the mouse enters.
    const onMouseOver = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-cursor]")
          : null;

      if (target?.dataset.cursor === "view") {
        setVariant("view");
        setLabel(target.dataset.cursorLabel ?? "View");
      } else if (target?.dataset.cursor === "link") {
        setVariant("link");
      } else {
        setVariant("default");
      }
    };

    // No relatedTarget means the pointer left the window entirely.
    const onMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) setVisible(false);
    };

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.body.classList.remove("cursor-none-active");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const overlayBase: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 60,
    pointerEvents: "none",
  };

  return (
    <>
      {/* Ring — trails the dot on a spring */}
      <motion.div
        aria-hidden
        style={{
          ...overlayBase,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: RING_SIZE,
          height: RING_SIZE,
          borderRadius: "50%",
          border: `1px solid rgba(${tokens.colors.accentRgb}, 0.65)`,
        }}
        animate={{
          scale: RING_SCALE[variant],
          opacity: visible ? 1 : 0,
          backgroundColor:
            variant === "view"
              ? `rgba(${tokens.colors.accentRgb}, 0.85)`
              : `rgba(${tokens.colors.accentRgb}, 0)`,
        }}
        transition={{ duration: 0.35, ease: tokens.easing.outExpo.array }}
      />

      {/* "view" label — rendered outside the ring so the ring's scale
          animation never stretches (and blurs) the text */}
      <motion.div
        aria-hidden
        style={{
          ...overlayBase,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          fontFamily: "var(--font-sans)",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: tokens.colors.textPrimary,
          whiteSpace: "nowrap",
        }}
        animate={{ opacity: visible && variant === "view" ? 1 : 0 }}
        transition={{ duration: 0.25, ease: tokens.easing.outExpo.array }}
      >
        {label}
      </motion.div>

      {/* Dot — tracks the pointer 1:1 */}
      <motion.div
        aria-hidden
        style={{
          ...overlayBase,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: "50%",
          background: tokens.colors.accent,
        }}
        animate={{
          opacity: !visible ? 0 : variant === "link" ? 0.35 : variant === "view" ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: tokens.easing.outExpo.array }}
      />
    </>
  );
}
