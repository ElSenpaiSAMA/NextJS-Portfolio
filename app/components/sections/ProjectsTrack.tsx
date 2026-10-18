"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CHOREOGRAPHY_QUERY, loadGsap } from "../../lib/load-gsap";
import { useMediaQuery } from "../../lib/use-media-query";

/**
 * Pins the projects and turns vertical scroll into horizontal travel on
 * desktop with motion allowed. Elsewhere the posters simply stack — the
 * markup is identical, only the transform differs, and GSAP never loads.
 */
export function ProjectsTrack({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const enabled = useMediaQuery(CHOREOGRAPHY_QUERY);

  useEffect(() => {
    if (!enabled) return;
    let revert: (() => void) | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap }) => {
      const rail = railRef.current;
      const viewport = viewportRef.current;
      if (cancelled || !rail || !viewport) return;
      const distance = () => rail.scrollWidth - viewport.clientWidth;
      const ctx = gsap.context(() => {
        gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "center center",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }, viewport);
      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [enabled]);

  return (
    <div ref={viewportRef} className="overflow-hidden py-10" data-testid="projects-track">
      <div ref={railRef} className="flex flex-col items-center gap-6 px-5 sm:px-8 md:w-max md:flex-row md:items-stretch md:gap-8 motion-reduce:md:w-auto motion-reduce:md:flex-col">
        {children}
      </div>
    </div>
  );
}
