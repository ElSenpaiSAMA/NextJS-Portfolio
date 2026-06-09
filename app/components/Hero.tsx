"use client";

import { useEffect, useRef, useCallback } from "react";
import TransitionLink from "./TransitionLink";

const WHAT_I_DO = [
  { label: "Backend", desc: ".NET · C# · REST APIs · SQL" },
  { label: "Fullstack", desc: "React · Next.js · TypeScript" },
  { label: "Data & AI", desc: "Python · Pandas · Ollama · n8n" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".motion-safe");
    els?.forEach((el) => el.classList.add("animate-fade-up-hero"));
  }, []);

  const openContact = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-contact-drawer"));
  }, []);

  return (
    <section ref={sectionRef} className="max-w-5xl mx-auto px-6" style={{ paddingTop: "clamp(48px, 9vh, 120px)", paddingBottom: "clamp(24px, 4vh, 64px)" }}>
      {/* Eyebrow */}
      <div className="motion-safe stagger-1 flex items-center gap-2 mb-6">
        <span
          className="inline-block w-2 h-2 rounded-full animate-pulse-dot"
          style={{ backgroundColor: "var(--color-available)" }}
          aria-hidden="true"
        />
        <span className="text-sm font-medium" style={{ color: "var(--color-available)" }}>
          Available for work · Barcelona, Spain
        </span>
      </div>

      {/* Name */}
      <h1
        className="motion-safe stagger-2 font-serif font-normal leading-none tracking-tight mb-4"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(48px, 8vw, 92px)",
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
        }}
      >
        Matias Speroni
      </h1>

      {/* Role */}
      <p className="motion-safe stagger-3 text-xl font-medium mb-6" style={{ color: "var(--color-muted)" }}>
        Backend &amp; Fullstack Developer
      </p>

      {/* Intro */}
      <p
        className="motion-safe stagger-4 text-base leading-relaxed max-w-xl mb-4"
        style={{ color: "var(--color-muted)" }}
      >
        I build production software end to end — from .NET and React applications
        to data pipelines and AI tools. Currently specializing in data &amp; AI.
      </p>

      {/* Currently strip */}
      <p className="motion-safe stagger-4 text-sm mb-7" style={{ color: "var(--color-faint)" }}>
        Currently at <span style={{ color: "var(--color-ink)" }}>Imagine</span> · Building{" "}
        <span style={{ color: "var(--color-ink)" }}>Mira</span> · Studying{" "}
        <span style={{ color: "var(--color-ink)" }}>Applied Data Science</span>
      </p>

      {/* CTA buttons */}
      <div className="motion-safe stagger-5 flex flex-wrap gap-3 mb-10">
        <TransitionLink href="/proyectos" className="btn-primary">View projects</TransitionLink>
        <button onClick={openContact} className="btn-ghost">Get in touch</button>
      </div>

      {/* What I do strip */}
      <div className="border-t border-hairline pt-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {WHAT_I_DO.map(({ label, desc }) => (
          <div key={label}>
            <p
              className="font-serif font-normal text-lg mb-1"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-ink)",
                letterSpacing: "-0.01em",
              }}
            >
              {label}
            </p>
            <p className="text-sm" style={{ color: "var(--color-faint)" }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
