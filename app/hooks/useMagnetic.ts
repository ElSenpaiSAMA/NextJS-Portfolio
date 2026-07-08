"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

interface MagneticHandle<T extends HTMLElement> {
  /** Callback ref — attach it to the target element. */
  ref: (node: T | null) => void;
  style: { x: MotionValue<number>; y: MotionValue<number> };
}

const SPRING = { stiffness: 180, damping: 14, mass: 0.4 };

/**
 * Magnetic hover: the element drifts toward the cursor while hovered and
 * springs back to rest on leave. `strength` scales how far it follows
 * (0 = static, 1 = glued to the cursor).
 *
 * `style` holds motion values, so the target MUST be a `motion.*` component
 * (e.g. `motion.button`, not a plain `<button>`). Spread it alongside the
 * element's own styles: `style={{ ...cssProps, ...magnetic.style }}`.
 */
export function useMagnetic<T extends HTMLElement>(
  strength = 0.3,
): MagneticHandle<T> {
  // Callback ref + state (instead of useRef) so the listener effect re-runs
  // when the node mounts, and render never touches a ref object.
  const [element, setElement] = useState<T | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  useEffect(() => {
    if (!element) return;

    const onMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      // The rect already includes the current magnetic offset — subtract it
      // to measure against the element's resting center, otherwise the
      // element chases its own transform.
      const centerX = rect.left + rect.width / 2 - springX.get();
      const centerY = rect.top + rect.height / 2 - springY.get();
      x.set((event.clientX - centerX) * strength);
      y.set((event.clientY - centerY) * strength);
    };

    const onMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseleave", onMouseLeave);
    return () => {
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [element, strength, x, y, springX, springY]);

  return { ref: setElement, style: { x: springX, y: springY } };
}
