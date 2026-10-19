"use client";

import { useEffect } from "react";
import { DESKTOP_MOTION_QUERY, MOTION_QUERY, loadGsap, useMediaQuery } from "../../lib/motion";

/**
 * The page's quiet scroll motion, in one place — the loud moments are
 * interactive (the shell, the physics stack), not scroll-jacked.
 * - `[data-rise]`: headings rise into place when they scroll in.
 * - `[data-reveal]`: blocks fade up, staggered (`ScrollTrigger.batch`, once).
 * Lenis smooths the scroll on desktop. Nothing loads with reduced motion, and
 * nothing is hidden in the HTML: without JS everything is simply there.
 */
export function ScrollChoreography() {
  const motion = useMediaQuery(MOTION_QUERY);
  const desktop = useMediaQuery(DESKTOP_MOTION_QUERY);

  useEffect(() => {
    if (!motion) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([loadGsap(), desktop ? import("lenis") : Promise.resolve(null)]).then(([{ gsap, ScrollTrigger }, lenisModule]) => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        for (const el of gsap.utils.toArray<HTMLElement>("[data-rise]")) {
          gsap.from(el, { y: 36, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        }
        gsap.set("[data-reveal]", { opacity: 0, y: 40 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 92%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.07, clearProps: "transform,opacity" }),
        });
      });

      let lenis: InstanceType<NonNullable<typeof lenisModule>["default"]> | undefined;
      let tick: ((time: number) => void) | undefined;
      if (lenisModule) {
        // anchors: in-page links glide instead of jumping (offset = fixed bar).
        lenis = new lenisModule.default({ lerp: 0.12, anchors: { offset: -44 } });
        lenis.on("scroll", ScrollTrigger.update);
        tick = (time: number) => lenis!.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);

      cleanup = () => {
        window.removeEventListener("load", refresh);
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
        ctx.revert();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [motion, desktop]);

  return null;
}
