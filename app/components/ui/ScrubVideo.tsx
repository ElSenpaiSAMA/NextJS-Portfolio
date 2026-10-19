"use client";

import { useEffect, useRef } from "react";
import type { FootageClip } from "../../data/media";
import { DESKTOP_MOTION_QUERY, useMediaQuery } from "../../lib/motion";
import { AmbientVideo } from "./AmbientVideo";

interface ScrubVideoProps {
  clip: FootageClip;
  /** Name the scroll choreography looks for: `[data-scrub="<name>"]`. */
  name: string;
  className?: string;
}

/**
 * Footage whose playhead the scroll drives (Apple-style).
 * - Desktop with motion: the dense-keyframe clip, paused; ScrollChoreography
 *   sets `currentTime` from the pinned section's progress. It downloads once
 *   the page is idle; the poster shows until then.
 * - Phones: the short muted loop. Reduced motion: the poster frame.
 */
export function ScrubVideo({ clip, name, className = "h-full w-full object-cover" }: ScrubVideoProps) {
  const desktop = useMediaQuery(DESKTOP_MOTION_QUERY);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
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

  if (desktop && clip.scrub) {
    return (
      <video
        ref={ref}
        className={className}
        poster={clip.poster}
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        data-scrub={name}
        data-testid={`${name}-scrub-video`}
      >
        <source src={clip.scrub.mp4} type="video/mp4" />
        <source src={clip.scrub.webm} type="video/webm" />
      </video>
    );
  }
  return <AmbientVideo sources={clip.loop} poster={clip.poster} className={className} />;
}
