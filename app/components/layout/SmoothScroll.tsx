"use client";

import { useEffect } from "react";
import { CHOREOGRAPHY_QUERY, loadGsap } from "../../lib/load-gsap";
import { useMediaQuery } from "../../lib/use-media-query";

/**
 * Inertial scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger and the
 * scroll stay in lock-step. Desktop only — touch scrolling is already
 * inertial — and off with prefers-reduced-motion. Both libraries are loaded
 * on demand. Renders nothing.
 */
export function SmoothScroll() {
  const enabled = useMediaQuery(CHOREOGRAPHY_QUERY);

  useEffect(() => {
    if (!enabled) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([loadGsap(), import("lenis")]).then(([{ gsap, ScrollTrigger }, { default: Lenis }]) => {
      if (cancelled) return;
      // anchors: in-page links (#projects…) glide instead of jumping.
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [enabled]);

  return null;
}
