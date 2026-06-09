"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { projects } from "../data/projects";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-baseline gap-4 mb-3">
        <h1
          className="font-serif text-3xl sm:text-4xl font-normal"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-ink)",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
      </div>
      <div className="hairline" />
    </div>
  );
}

export default function ProyectosPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".project-card");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
      <SectionHeader title="Projects" />

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="project-card motion-safe flex flex-col bg-surface border border-hairline hover:border-hairline-hover transition-colors duration-200 overflow-hidden"
            style={{ borderRadius: "var(--radius-md)" }}
          >
            {/* Screenshot */}
            <div
              className="relative w-full bg-paper border-b border-hairline overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs uppercase tracking-wider" style={{ color: "var(--color-faint)" }}>
                    Preview unavailable
                  </span>
                </div>
              )}

              {project.inDevelopment && (
                <span
                  className="absolute top-3 right-3 px-2 py-0.5 text-xs font-medium bg-surface border border-hairline"
                  style={{ borderRadius: "var(--radius-sm)", color: "var(--color-muted)" }}
                >
                  In development
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
              <h2
                className="font-serif text-xl font-normal"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                {project.title}
              </h2>

              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-muted)" }}>
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs border border-hairline"
                    style={{
                      borderRadius: "var(--radius-sm)",
                      color: "var(--color-faint)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              {(project.github || project.siteLink) ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-sm self-start"
                    >
                      View on GitHub →
                    </a>
                  )}
                  {project.siteLink && (
                    <a
                      href={project.siteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm self-start"
                    >
                      View project →
                    </a>
                  )}
                </div>
              ) : (
                <span className="text-xs mt-1" style={{ color: "var(--color-faint)" }}>
                  No public link yet
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
