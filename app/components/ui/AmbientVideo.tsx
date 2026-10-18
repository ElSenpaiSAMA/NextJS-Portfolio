"use client";

import { useEffect, useRef } from "react";
import type { VideoSources } from "../../data/media";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "../../lib/use-media-query";

interface AmbientVideoProps {
  sources: VideoSources;
  poster: string;
  className?: string;
}

/**
 * Muted, looping background footage. Downloads nothing until it scrolls
 * near the viewport, plays only while visible, and stays on its poster
 * frame for visitors who prefer reduced motion. Decorative: aria-hidden.
 */
export function AmbientVideo({ sources, poster, className = "" }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === "none") {
            video.preload = "auto";
            video.load();
          }
          video.play().catch(() => {
            /* Autoplay can be refused (power saving): the poster stays, which is fine. */
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reducedMotion]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      data-testid="ambient-video"
    >
      <source src={sources.mp4} type="video/mp4" />
      <source src={sources.webm} type="video/webm" />
    </video>
  );
}
