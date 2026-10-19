"use client";

import { useEffect, useRef } from "react";
import { heroFootage } from "../../data/media";
import { DESKTOP_MOTION_QUERY, useMediaQuery } from "../../lib/motion";
import { AmbientVideo } from "./AmbientVideo";

/**
 * The hero's data-center footage.
 * - Desktop with motion: the dense-keyframe clip, paused; ScrollChoreography
 *   drives its playhead with the scroll (`[data-hero-scrub]`). Its ~2 MB start
 *   downloading only once the page is idle — the poster shows until then.
 * - Phones: a short muted loop. Reduced motion: the poster frame.
 */
export function HeroFootage() {
  const desktop = useMediaQuery(DESKTOP_MOTION_QUERY);
  const scrubRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = scrubRef.current;
    if (!desktop || !video) return;
    const load = () => {
      video.preload = "auto";
      video.load();
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(load, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(load, 800);
    return () => clearTimeout(id);
  }, [desktop]);

  if (desktop && heroFootage.scrub) {
    return (
      <video
        ref={scrubRef}
        className="h-full w-full object-cover"
        poster={heroFootage.poster}
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        data-hero-scrub
        data-testid="hero-scrub-video"
      >
        <source src={heroFootage.scrub.mp4} type="video/mp4" />
        <source src={heroFootage.scrub.webm} type="video/webm" />
      </video>
    );
  }
  return <AmbientVideo sources={heroFootage.loop} poster={heroFootage.poster} className="h-full w-full object-cover" />;
}
