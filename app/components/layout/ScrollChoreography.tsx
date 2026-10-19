"use client";

import { useEffect } from "react";
import { DESKTOP_MOTION_QUERY, MOTION_QUERY, loadGsap, useMediaQuery } from "../../lib/motion";

const REVEAL_FROM = { opacity: 0, y: 60, rotateX: 8, transformPerspective: 1200 };

/**
 * Every scroll-driven animation on the page, in one place. Sections stay
 * server components and only mark what moves with data attributes:
 * - `#top` hero (desktop): pins while the scroll drives the data-center
 *   video's playhead (`[data-hero-scrub]`), so scrolling walks down the server
 *   aisle, as the copy and terminal clear out and the tagline shows.
 * - `[data-command]`: the shell command above a title types itself in.
 * - `[data-section-title]`: the title rises after its command.
 * - `[data-reveal]`: windows/cards enter with a slight 3D tilt, staggered.
 * - `[data-branch]` / `[data-node]`: the git-log line draws with the scroll.
 * - `#stack .code-line`: stack.yml prints line by line.
 * Lenis adds inertial scrolling on desktop. Nothing loads with reduced
 * motion, and nothing is hidden before GSAP runs (content never depends on it).
 */
export function ScrollChoreography() {
  const motion = useMediaQuery(MOTION_QUERY);
  const desktop = useMediaQuery(DESKTOP_MOTION_QUERY);

  useEffect(() => {
    if (!motion) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    let frame = 0;

    Promise.all([loadGsap(), desktop ? import("lenis") : Promise.resolve(null)]).then(([{ gsap, ScrollTrigger }, lenisModule]) => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        const hero = document.getElementById("top");
        const video = document.querySelector<HTMLVideoElement>("[data-hero-scrub]");
        if (hero && desktop) {
          // At most one seek per frame: seeking is the expensive part.
          const seek = (progress: number) => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
              if (!video || !Number.isFinite(video.duration)) return;
              const time = progress * (video.duration - 0.05);
              if (Math.abs(video.currentTime - time) > 0.02) video.currentTime = time;
            });
          };
          gsap
            .timeline({
              scrollTrigger: { trigger: hero, start: "top top", end: "+=160%", pin: true, scrub: 0.5, onUpdate: ({ progress }) => seek(progress) },
            })
            .fromTo("[data-hero-scrub]", { scale: 1.12 }, { scale: 1, ease: "none", duration: 1 }, 0)
            .to("[data-hero-veil]", { opacity: 0.3, ease: "none", duration: 0.35 }, 0)
            .to("[data-hero-copy]", { y: -60, opacity: 0, ease: "power2.in", duration: 0.3 }, 0)
            .to("[data-hero-term]", { y: -100, opacity: 0, ease: "power2.in", duration: 0.3 }, 0.04)
            .fromTo("[data-hero-tagline]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.2 }, 0.45)
            .to("[data-hero-tagline]", { opacity: 0, y: -30, ease: "power2.in", duration: 0.15 }, 0.85);
        }

        for (const command of gsap.utils.toArray<HTMLElement>("[data-command]")) {
          const chars = command.textContent?.length ?? 10;
          gsap.fromTo(
            command,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", ease: `steps(${chars})`, duration: chars * 0.035, scrollTrigger: { trigger: command, start: "top 88%", once: true } },
          );
        }
        for (const title of gsap.utils.toArray<HTMLElement>("[data-section-title]")) {
          gsap.from(title, { y: 50, opacity: 0, duration: 0.9, delay: 0.3, ease: "power4.out", scrollTrigger: { trigger: title, start: "top 88%", once: true } });
        }

        gsap.set("[data-reveal]", REVEAL_FROM);
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power4.out", stagger: 0.12, clearProps: "transform,opacity" }),
        });

        const graph = document.querySelector("[data-branch]");
        if (graph) {
          gsap.fromTo(
            graph,
            { scaleY: 0 },
            { scaleY: 1, ease: "none", transformOrigin: "top center", scrollTrigger: { trigger: graph, start: "top 80%", end: "bottom 60%", scrub: 0.6 } },
          );
        }
        gsap.set("[data-node]", { scale: 0 });
        ScrollTrigger.batch("[data-node]", {
          start: "top 80%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { scale: 1, duration: 0.6, ease: "back.out(3)" }),
        });

        gsap.set("#stack .code-line", { opacity: 0, x: -16 });
        ScrollTrigger.batch("#stack .code-line", {
          start: "top 92%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", stagger: 0.025, clearProps: "transform,opacity" }),
        });
      });

      let lenis: InstanceType<NonNullable<typeof lenisModule>["default"]> | undefined;
      let tick: ((time: number) => void) | undefined;
      if (lenisModule) {
        // anchors: in-page links glide instead of jumping (offset = fixed header).
        lenis = new lenisModule.default({ lerp: 0.1, anchors: { offset: -64 } });
        lenis.on("scroll", ScrollTrigger.update);
        tick = (time: number) => lenis!.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      // Late images and fonts shift layout: recompute trigger positions once loaded.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);

      cleanup = () => {
        cancelAnimationFrame(frame);
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
