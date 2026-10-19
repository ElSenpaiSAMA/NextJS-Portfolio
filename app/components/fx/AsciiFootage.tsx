"use client";

import { useEffect, useRef } from "react";
import type { FootageClip } from "../../data/media";
import { DESKTOP_MOTION_QUERY, MOTION_QUERY, useMediaQuery } from "../../lib/motion";
import { AsciiCanvas } from "./AsciiCanvas";

interface AsciiFootageProps {
  clip: FootageClip;
  /** `[data-scrub="<name>"]` on the video and `[data-real="<name>"]` on the real-footage layer. */
  name: string;
  ramp: string;
  cell?: number;
  /** Mid-tone stretch passed to the renderer (dark footage wants more). */
  contrast?: number;
  /** Scroll drives the playhead on desktop (needs `clip.scrub`). Otherwise the loop plays. */
  scrub?: boolean;
  /** Opacity of the ASCII layer (lower = background texture). */
  intensity?: number;
}

/**
 * Real footage rendered as ASCII. The <video> underneath is the source and,
 * at opacity 0, also the "real" layer the choreography can fade in (the
 * ASCII compiles into the actual footage).
 * - Desktop with motion + scrub: the dense-keyframe clip, paused; the scroll
 *   seeks it and the ASCII redraws on every seek. Loads once the page is idle.
 * - Otherwise with motion: the short loop, playing only while visible.
 * - Reduced motion: the poster frame, drawn once.
 */
export function AsciiFootage({ clip, name, ramp, cell, contrast, scrub = false, intensity = 1 }: AsciiFootageProps) {
  const motion = useMediaQuery(MOTION_QUERY);
  const desktop = useMediaQuery(DESKTOP_MOTION_QUERY);
  const useScrub = scrub && desktop && !!clip.scrub;
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!motion || !video) return;
    if (useScrub) {
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
    }
    // Loop: load and play near the viewport, pause away from it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === "none") {
            video.preload = "auto";
            video.load();
          }
          video.play().catch(() => {
            /* Autoplay refused (power saving): the poster stays. */
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
  }, [motion, useScrub]);

  const sources = useScrub && clip.scrub ? clip.scrub : clip.loop;

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {motion ? (
        <video
          key={useScrub ? "scrub" : "loop"}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-0"
          poster={clip.poster}
          muted
          loop={!useScrub}
          playsInline
          preload="none"
          tabIndex={-1}
          data-scrub={useScrub ? name : undefined}
          data-real={name}
          data-testid={`${name}-video`}
        >
          <source src={sources.mp4} type="video/mp4" />
          <source src={sources.webm} type="video/webm" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- sampled by the canvas, never shown
        <img ref={posterRef} src={clip.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-0" />
      )}
      <div className="absolute inset-0" style={{ opacity: intensity }} data-ascii={name}>
        <AsciiCanvas source={motion ? videoRef : posterRef} live={motion && !useScrub} ramp={ramp} cell={cell} contrast={contrast} />
      </div>
    </div>
  );
}
