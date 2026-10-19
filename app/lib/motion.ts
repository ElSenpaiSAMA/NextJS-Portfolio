"use client";

import { useSyncExternalStore } from "react";

/** Any motion at all (scroll reveals, background video). */
export const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";
/**
 * Desktop with motion: inertial scrolling (touch is already inertial) and the
 * hero video scrubbed by the scroll. Phones get a light muted loop instead.
 */
export const DESKTOP_MOTION_QUERY = "(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 768px)";

/** Subscribes to a media query; `false` on the server and in the first client render. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** GSAP + ScrollTrigger, downloaded on demand and registered once. */
export async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

