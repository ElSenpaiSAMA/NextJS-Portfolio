"use client";

import { useEffect } from "react";
import { scrambleFrame } from "../../lib/ascii";
import { DESKTOP_MOTION_QUERY, MOTION_QUERY, loadGsap, useMediaQuery } from "../../lib/motion";

type Gsap = Awaited<ReturnType<typeof loadGsap>>["gsap"];

/** Decodes an element's text from random glyphs, left to right. The original text is kept in data-text. */
function makeScrambler(gsap: Gsap) {
  const running = new WeakMap<HTMLElement, { kill: () => void }>();
  return (el: HTMLElement, duration = 0.9, delay = 0) => {
    const text = (el.dataset.text ??= el.textContent ?? "");
    running.get(el)?.kill();
    const state = { p: 0 };
    const tween = gsap.to(state, {
      p: 1,
      duration,
      delay,
      ease: "none",
      onUpdate: () => {
        el.textContent = scrambleFrame(text, state.p);
      },
      onComplete: () => {
        el.textContent = text;
      },
    });
    running.set(el, tween);
  };
}

/** Ties a video's playhead to a scroll progress, at most one seek per frame. */
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
 * Every scroll- and pointer-driven animation, in one place. Sections stay
 * server components and only mark what moves:
 *
 * Desktop with motion
 * - `#top`: pins; the scroll seeks the hero video (`[data-scrub="hero"]`), so
 *   the ASCII aisle moves; halfway the ASCII layer (`[data-ascii="hero"]`)
 *   gives way to the real footage (`[data-real="hero"]`) and the tagline shows.
 * - `[data-track]`: projects pin and run sideways.
 * - `[data-magnetic]`: buttons lean towards the pointer.
 *
 * Any device with motion
 * - `[data-scramble]`: text decodes when it scrolls in (`data-scramble-now`:
 *   right away, after the build screen). `[data-scramble-hover]`: on hover.
 * - `[data-code-line]` / `[data-build-step]`: the source types itself and the
 *   build ticks while you scroll past it.
 * - `[data-branch]` / `[data-node]`: the git graph draws itself.
 * - `[data-reveal]`: blocks fade up, staggered.
 *
 * Lenis smooths the scroll on desktop. Nothing loads with reduced motion, and
 * nothing is hidden in the HTML: without JS everything is simply there.
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
      const scramble = makeScrambler(gsap);
      const scrubbers: ReturnType<typeof scrubber>[] = [];
      const offPointer: (() => void)[] = [];

      const ctx = gsap.context(() => {
        // --- Hero: ASCII aisle → real footage -------------------------------
        const hero = document.getElementById("top");
        if (desktop && hero) {
          const video = scrubber(document.querySelector("[data-scrub='hero']"));
          scrubbers.push(video);
          gsap
            .timeline({
              scrollTrigger: { trigger: hero, start: "top top", end: "+=200%", pin: true, scrub: 0.6, onUpdate: ({ progress }) => video.seek(progress) },
            })
            .to("[data-hero-copy]", { y: -80, opacity: 0, ease: "power2.in", duration: 0.3 }, 0)
            .to("[data-ascii='hero']", { opacity: 0, ease: "power1.inOut", duration: 0.18 }, 0.45)
            .to("[data-real='hero']", { opacity: 1, ease: "power1.inOut", duration: 0.18 }, 0.45)
            .to("[data-hero-veil]", { opacity: 0.55, ease: "none", duration: 0.2 }, 0.45)
            .fromTo("[data-hero-tagline]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.15 }, 0.62)
            .to("[data-hero-tagline]", { opacity: 0, y: -30, ease: "power2.in", duration: 0.12 }, 0.88);
        }

        // --- Text decode -----------------------------------------------------
        const introPlaying = document.documentElement.dataset.intro !== "seen" && !!document.querySelector("[data-testid='intro']");
        for (const el of gsap.utils.toArray<HTMLElement>("[data-scramble-now]")) scramble(el, 1.2, introPlaying ? 2.5 : 0.2);
        for (const el of gsap.utils.toArray<HTMLElement>("[data-scramble]:not([data-scramble-now])")) {
          ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => scramble(el) });
        }
        for (const el of gsap.utils.toArray<HTMLElement>("[data-scramble-hover]")) {
          const host = el.closest<HTMLElement>("a, article") ?? el;
          const run = () => scramble(el, 0.5);
          host.addEventListener("pointerenter", run);
          offPointer.push(() => host.removeEventListener("pointerenter", run));
        }

        // --- Source: the file types itself, the build ticks -------------------
        const source = document.querySelector("[data-source]");
        if (source) {
          const lines = gsap.utils.toArray<HTMLElement>("[data-code-line]", source);
          const steps = gsap.utils.toArray<HTMLElement>("[data-build-step]", source);
          const typing = gsap.timeline({ scrollTrigger: { trigger: source, start: "top 75%", end: "bottom 70%", scrub: 0.4 } });
          lines.forEach((line, i) => {
            const chars = Math.max(1, line.textContent?.length ?? 1);
            typing.fromTo(line, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: `steps(${Math.min(chars, 60)})`, duration: 1 }, i * 0.85);
          });
          const span = lines.length * 0.85;
          steps.forEach((step, i) => {
            typing.fromTo(step, { opacity: 0.25 }, { opacity: 1, duration: 0.4 }, (span / steps.length) * (i + 1) - 0.4);
          });
          typing.fromTo("[data-build-done]", { opacity: 0 }, { opacity: 1, duration: 0.4 }, span);
        }

        // --- Projects: sideways run ------------------------------------------
        const track = document.querySelector<HTMLElement>("[data-track]");
        const viewport = document.querySelector<HTMLElement>("[data-track-viewport]");
        if (desktop && track && viewport) {
          const distance = () => track.scrollWidth - viewport.clientWidth;
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: { trigger: viewport, start: "center center", end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
          });
        }

        // --- Git graph --------------------------------------------------------
        const branch = document.querySelector("[data-branch]");
        if (branch) {
          gsap.fromTo(branch, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: branch, start: "top 75%", end: "bottom 60%", scrub: 0.5 } });
        }
        gsap.set("[data-node]", { scale: 0 });
        ScrollTrigger.batch("[data-node]", { start: "top 80%", once: true, onEnter: (batch) => gsap.to(batch, { scale: 1, duration: 0.6, ease: "back.out(3)" }) });

        // --- Reveals ----------------------------------------------------------
        gsap.set("[data-reveal]", { opacity: 0, y: 50 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, clearProps: "transform,opacity" }),
        });

        // --- Magnetic buttons (desktop) --------------------------------------
        if (desktop) {
          for (const el of gsap.utils.toArray<HTMLElement>("[data-magnetic]")) {
            const toX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
            const toY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              toX((e.clientX - (r.left + r.width / 2)) * 0.25);
              toY((e.clientY - (r.top + r.height / 2)) * 0.35);
            };
            const leave = () => {
              toX(0);
              toY(0);
            };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            offPointer.push(() => {
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            });
          }
        }
      });

      let lenis: InstanceType<NonNullable<typeof lenisModule>["default"]> | undefined;
      let tick: ((time: number) => void) | undefined;
      if (lenisModule) {
        // anchors: in-page links glide instead of jumping (offset = fixed bar).
        lenis = new lenisModule.default({ lerp: 0.1, anchors: { offset: -56 } });
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
        offPointer.forEach((off) => off());
        window.removeEventListener("load", refresh);
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
        ctx.revert();
        // Restore any text left mid-decode.
        document.querySelectorAll<HTMLElement>("[data-text]").forEach((el) => {
          el.textContent = el.dataset.text ?? el.textContent;
        });
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [motion, desktop]);

  return null;
}
