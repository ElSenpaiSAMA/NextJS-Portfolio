"use client";

import { useEffect, useRef } from "react";
import { heroFootage } from "../../data/media";
import { profile } from "../../data/profile";
import { CHOREOGRAPHY_QUERY, loadGsap } from "../../lib/load-gsap";
import { useMediaQuery } from "../../lib/use-media-query";
import { AmbientVideo } from "../ui/AmbientVideo";
import { ButtonLink } from "../ui/ButtonLink";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "../ui/icons";
import { FootageGrade } from "../ui/FootageGrade";

/**
 * Opening shot: real night-time footage of a container terminal.
 * Desktop (motion allowed): the section pins and the scroll drives the clip's
 * playhead, so the light trails flow as you scroll while the name dissolves.
 * Phones: the same footage as a light muted loop. Reduced motion: poster frame.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrubRef = useRef<HTMLVideoElement>(null);
  const choreography = useMediaQuery(CHOREOGRAPHY_QUERY);

  useEffect(() => {
    const video = scrubRef.current;
    if (!choreography || !video) return;
    let revert: (() => void) | undefined;
    let cancelled = false;
    let frame = 0;

    // Fetch the 4 MB scrub clip only once the page is idle.
    const startLoading = () => {
      video.preload = "auto";
      video.load();
    };
    let cancelIdle: () => void;
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(startLoading, { timeout: 2000 });
      cancelIdle = () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(startLoading, 800);
      cancelIdle = () => clearTimeout(id);
    }

    loadGsap().then(({ gsap }) => {
      const section = sectionRef.current;
      if (cancelled || !section) return;
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 0.5,
            onUpdate: ({ progress }) => {
              // One seek per animation frame at most; seeking is the expensive part.
              cancelAnimationFrame(frame);
              frame = requestAnimationFrame(() => {
                if (!Number.isFinite(video.duration)) return;
                const time = progress * (video.duration - 0.05);
                if (Math.abs(video.currentTime - time) > 0.02) video.currentTime = time;
              });
            },
          },
        });
        timeline
          .fromTo(video, { scale: 1.15 }, { scale: 1, ease: "none" }, 0)
          .to("[data-hero-name]", { scale: 1.9, yPercent: -20, opacity: 0, ease: "power2.in", duration: 0.45 }, 0)
          .to("[data-hero-details]", { y: -40, opacity: 0, ease: "power2.in", duration: 0.35 }, 0)
          .fromTo("[data-hero-tagline]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 }, 0.5)
          .to("[data-hero-tagline]", { opacity: 0, y: -30, ease: "power2.in", duration: 0.2 }, 0.85);
      }, section);
      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      cancelIdle();
      revert?.();
    };
  }, [choreography]);

  return (
    <section id="top" ref={sectionRef} aria-labelledby="hero-heading" className="relative isolate h-[100svh] overflow-hidden bg-night">
      <div className="absolute inset-0 -z-20">
        {choreography && heroFootage.scrub ? (
          <video
            ref={scrubRef}
            className="h-full w-full object-cover"
            poster={heroFootage.poster}
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            data-testid="hero-scrub-video"
          >
            <source src={heroFootage.scrub.mp4} type="video/mp4" />
            <source src={heroFootage.scrub.webm} type="video/webm" />
          </video>
        ) : (
          <AmbientVideo sources={heroFootage.loop} poster={heroFootage.poster} className="h-full w-full object-cover" />
        )}
      </div>
      <FootageGrade className="-z-10" />
      {/* Legibility veil: darker at the top (header) and bottom (copy) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(22,11,46,0.75)_0%,rgba(22,11,46,0)_22%,rgba(22,11,46,0)_45%,rgba(22,11,46,0.85)_85%,#160b2e_100%)]" />

      <div className="mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-night/60 px-3 py-1.5 text-sm text-haze backdrop-blur" data-hero-details>
          <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
          {profile.availability} in {profile.location}
        </p>

        <h1 id="hero-heading" className="display ink-sunset w-fit origin-bottom-left text-[clamp(4.5rem,17vw,15rem)]" data-hero-name>
          {/* The space keeps the accessible name "Matias Speroni", not "MatiasSperoni" */}
          <span className="block">Matias</span> <span className="block">Speroni</span>
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end" data-hero-details>
          <div className="max-w-xl">
            <p className="text-xl font-semibold text-haze sm:text-2xl">{profile.role}</p>
            <p className="mt-3 text-base leading-relaxed text-haze-muted sm:text-lg">{profile.intro}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#projects" variant="primary">
              View work
            </ButtonLink>
            <ButtonLink href="#contact">Get in touch</ButtonLink>
            <ButtonLink href={profile.githubUrl} external>
              <GitHubIcon /> GitHub
            </ButtonLink>
            <ButtonLink href={profile.linkedinUrl} external>
              <LinkedInIcon /> LinkedIn
            </ButtonLink>
            {profile.cvUrl && (
              <ButtonLink href={profile.cvUrl} download>
                <DownloadIcon /> CV
              </ButtonLink>
            )}
          </div>
        </div>
      </div>

      {/* Revealed mid-scroll, once the name has dissolved into the terminal */}
      <p
        data-hero-tagline
        className="display pointer-events-none absolute inset-x-5 top-1/2 mx-auto hidden max-w-5xl -translate-y-1/2 text-center text-[clamp(2.5rem,7vw,6.5rem)] opacity-0 md:block motion-reduce:hidden"
        aria-hidden="true"
      >
        I ship the software and the pipelines behind it
      </p>
    </section>
  );
}
