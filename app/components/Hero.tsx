"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const WHAT_I_DO = [
  { label: "Backend", desc: ".NET · C# · REST APIs · SQL" },
  { label: "Fullstack", desc: "React · Next.js · TypeScript" },
  { label: "Data & AI", desc: "Python · Pandas · Ollama · n8n" },
];

const NOW_ITEMS = [
  { label: "Working at", value: "Imagine" },
  { label: "Building", value: "Mira — AI search analytics" },
  { label: "Studying", value: "Applied Data Science" },
  { label: "Based in", value: "Barcelona, Spain" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".motion-safe");
    els?.forEach((el) => el.classList.add("animate-fade-up-hero"));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-5xl mx-auto px-6 pt-36 pb-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start mb-20">
        {/* Left — main content */}
        <div>
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
          <p
            className="motion-safe stagger-3 text-xl font-medium mb-6"
            style={{ color: "var(--color-muted)" }}
          >
            Backend &amp; Fullstack Developer
          </p>

          {/* Intro */}
          <p
            className="motion-safe stagger-4 text-base leading-relaxed max-w-xl mb-10"
            style={{ color: "var(--color-muted)" }}
          >
            I build production software end to end — from .NET and React applications
            to data pipelines and AI tools. Currently specializing in data &amp; AI.
          </p>

          {/* CTA buttons */}
          <div className="motion-safe stagger-5 flex flex-wrap gap-3">
            <Link href="/proyectos" className="btn-primary">
              View projects
            </Link>
            <Link href="/contacto" className="btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>

        {/* Right — Now card */}
        <div
          className="motion-safe stagger-5 border border-hairline p-5 self-start"
          style={{ borderRadius: "var(--radius-md)", backgroundColor: "var(--color-surface)" }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-4 font-medium"
            style={{ color: "var(--color-accent)" }}
          >
            Now
          </p>
          <dl className="space-y-3">
            {NOW_ITEMS.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--color-faint)" }}>
                  {label}
                </dt>
                <dd className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* What I do strip */}
      <div className="border-t border-hairline pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
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
            <p className="text-sm" style={{ color: "var(--color-faint)" }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
