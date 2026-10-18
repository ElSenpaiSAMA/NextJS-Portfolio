/**
 * GSAP + ScrollTrigger, loaded on demand. Only desktop with motion allowed
 * uses scroll-driven animation, so phones and reduced-motion visitors never
 * download or evaluate it. Modules are cached, so every caller shares one
 * gsap/ScrollTrigger instance.
 */
export async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

/** Wide screen, fine pointer, motion allowed: the only place the scroll choreography runs. */
export const CHOREOGRAPHY_QUERY = "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
