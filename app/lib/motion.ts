"use client";

import { useSyncExternalStore } from "react";

/** Any motion at all (scroll reveals, 3D animation). */
export const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";
/** Smooth (inertial) scrolling: desktop pointers only — touch is already inertial. */
export const SMOOTH_SCROLL_QUERY = "(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 768px)";
/** Where the WebGL cluster runs; phones get the SVG version. */
export const WEBGL_SCENE_QUERY = "(min-width: 768px)";

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

/** True when the browser can create a WebGL context. */
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
