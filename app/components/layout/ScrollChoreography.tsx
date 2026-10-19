"use client";

import { useEffect } from "react";
import { DESKTOP_MOTION_QUERY, MOTION_QUERY, loadGsap, useMediaQuery } from "../../lib/motion";

/** Ties a video's playhead to a scroll progress, with at most one seek per frame. */
function scrubber(video: HTMLVideoElement | null) {
  let frame = 0;
  return {
    seek(progress: number) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!video || !Number.isFinite(video.duration)) return;
        const time = progress * (video.duration - 0.05);
        if (Math.abs(video.currentTime - time) > 0.02) video.currentTime = time;
      });
    },
    stop: () => cancelAnimationFrame(frame),
  };
}

/**
 * Every scroll-driven animation on the page, in one place. Sections stay
 * server components and only mark what moves with data attributes.
 *
 * Desktop with motion (pinned, scrubbed, Apple keynote style):
 * - `#top`: the hero pins; the scroll walks down the data-center aisle
 *   (`[data-scrub="hero"]`) while the name recedes and the tagline takes over.
 * - `[data-story]`: Build / Ship / Run pins over the circuit-board footage
 *   (`[data-scrub="story"]`) and swaps its three captions in place.
 *
 * Any device with motion:
 * - `[data-statement] [data-word]`: the intro lights up word by word.
 * - `[data-rise]`: headlines rise into place.
 * - `[data-reveal]`: tiles and cards fade up, staggered.
 * - `[data-stage]`: the pipeline's checks pop in one after another.
 *
 * Lenis adds inertial scrolling on desktop. Nothing loads with reduced
 * motion, and nothing is hidden in the HTML: without JS everything shows.
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
      const scrubbers: ReturnType<typeof scrubber>[] = [];

      const ctx = gsap.context(() => {
        const hero = document.getElementById("top");
        const story = document.querySelector<HTMLElement>("[data-story]");

        if (desktop && hero) {
          const video = scrubber(document.querySelector("[data-scrub='hero']"));
          scrubbers.push(video);
          gsap
            .timeline({
              scrollTrigger: { trigger: hero, start: "top top", end: "+=150%", pin: true, scrub: 0.6, onUpdate: ({ progress }) => video.seek(progress) },
            })
            .fromTo("[data-scrub='hero']", { scale: 1.15 }, { scale: 1, ease: "none", duration: 1 }, 0)
            .to("[data-hero-copy]", { scale: 0.86, opacity: 0, y: -40, ease: "power2.in", duration: 0.35 }, 0)
            .to("[data-hero-veil]", { opacity: 0.45, ease: "none", duration: 0.35 }, 0)
            .fromTo("[data-hero-tagline]", { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, ease: "power2.out", duration: 0.25 }, 0.4)
            .to("[data-hero-tagline]", { opacity: 0, ease: "power2.in", duration: 0.15 }, 0.85);
        }

        if (desktop && story) {
          story.dataset.scrubbing = "true";
          const video = scrubber(story.querySelector("[data-scrub='story']"));
          scrubbers.push(video);
          const captions = gsap.utils.toArray<HTMLElement>("[data-story-caption]", story);
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: story, start: "top top", end: "+=220%", pin: true, scrub: 0.6, onUpdate: ({ progress }) => video.seek(progress) },
          });
          gsap.set(captions.slice(1), { opacity: 0, y: 50 });
          captions.forEach((caption, i) => {
            if (i === 0) return;
            const at = i / captions.length;
            timeline
              .to(captions[i - 1], { opacity: 0, y: -50, ease: "power2.in", duration: 0.12 }, at - 0.12)
              .to(caption, { opacity: 1, y: 0, ease: "power2.out", duration: 0.12 }, at);
          });
          timeline.to({}, { duration: 0.15 }); // hold the last chapter before unpinning
        }

        // The intro paragraph lights up word by word.
        const statement = document.querySelector("[data-statement]");
        if (statement) {
          gsap.fromTo(
            statement.querySelectorAll("[data-word]"),
            { opacity: 0.18 },
            { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: statement, start: "top 80%", end: "bottom 45%", scrub: true } },
          );
        }

        for (const element of gsap.utils.toArray<HTMLElement>("[data-rise]")) {
          gsap.from(element, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
        }

        gsap.set("[data-reveal]", { opacity: 0, y: 60 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1, clearProps: "transform,opacity" }),
        });

        gsap.set("[data-stage]", { opacity: 0, x: -12 });
        ScrollTrigger.batch("[data-stage]", {
          start: "top 92%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, duration: 0.45, ease: "power2.out", stagger: 0.12, clearProps: "transform,opacity" }),
        });
      });

      let lenis: InstanceType<NonNullable<typeof lenisModule>["default"]> | undefined;
      let tick: ((time: number) => void) | undefined;
      if (lenisModule) {
        // anchors: in-page links glide instead of jumping (offset = fixed bar).
        lenis = new lenisModule.default({ lerp: 0.1, anchors: { offset: -48 } });
        lenis.on("scroll", ScrollTrigger.update);
        tick = (time: number) => lenis!.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      // Late images and fonts shift layout: recompute trigger positions once loaded.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);

      cleanup = () => {
        scrubbers.forEach((s) => s.stop());
        window.removeEventListener("load", refresh);
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
        ctx.revert();
        document.querySelector<HTMLElement>("[data-story]")?.removeAttribute("data-scrubbing");
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [motion, desktop]);

  return null;
}
