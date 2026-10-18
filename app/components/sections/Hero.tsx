"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { profile } from "../../data/profile";
import { heroProgress } from "../../lib/hero-progress";
import { CHOREOGRAPHY_QUERY, loadGsap } from "../../lib/load-gsap";
import { REDUCED_MOTION_QUERY, supportsWebGL, useMediaQuery } from "../../lib/use-media-query";
import { StaticSkyline } from "../scene/StaticSkyline";
import { ButtonLink } from "../ui/ButtonLink";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "../ui/icons";

// three.js stays out of the initial bundle and off the server.
const CityScene = dynamic(() => import("../scene/CityScene"), { ssr: false });

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const compact = useMediaQuery("(max-width: 767px)");
  const choreography = useMediaQuery(CHOREOGRAPHY_QUERY);
  const [show3d, setShow3d] = useState(false);
  const [onScreen, setOnScreen] = useState(true);

  // The 3D harbour is a desktop treat: phones keep the painted skyline (battery
  // and main-thread budget). On desktop it loads once the browser is idle, so
  // three.js never competes with the first paint.
  useEffect(() => {
    if (compact || !supportsWebGL()) return;
    const load = () => setShow3d(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(load, 1200);
    return () => clearTimeout(id);
  }, [compact]);

  // Stop rendering the scene once the hero has scrolled away.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pinned fly-through: desktop with motion allowed only. GSAP is loaded on
  // demand, so phones never download it.
  useEffect(() => {
    if (!choreography) return;
    let revert: (() => void) | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap }) => {
      const section = sectionRef.current;
      if (cancelled || !section) return;
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=140%",
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              heroProgress.current = self.progress;
            },
          },
        });
        timeline
          .to("[data-hero-name]", { scale: 1.9, yPercent: -20, opacity: 0, ease: "power2.in" }, 0)
          .to("[data-hero-details]", { y: -40, opacity: 0, ease: "power2.in" }, 0)
          .fromTo("[data-hero-tagline]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.out" }, 0.45);
      }, section);
      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
      heroProgress.current = 0;
    };
  }, [choreography]);

  return (
    <section id="top" ref={sectionRef} aria-labelledby="hero-heading" className="relative isolate h-[100svh] overflow-hidden">
      {/* Painted skyline: instant first paint, the phone version and the no-WebGL fallback */}
      <div className="absolute inset-0 -z-20">
        <StaticSkyline />
      </div>
      {show3d && !compact && (
        <div className="absolute inset-0 -z-10" data-testid="city-scene">
          <CityScene active={onScreen} animated={!reducedMotion} />
        </div>
      )}
      {/* Legibility veil over the 3D scene */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-night/70 via-night/20 to-night/90" />

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

      {/* Revealed mid-flight, once the name has dissolved into the city */}
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
