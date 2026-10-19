import Image from "next/image";
import { projects } from "../../data/projects";
import { stack } from "../../data/stack";
import type { Project } from "../../data/types";
import { findTech } from "../../lib/tags";
import { TechTag } from "../ui/TechTag";

/** A built artifact: screenshot, "artifact" line (name + status), description, tech with logos, links. */
function Artifact({ project, index }: { project: Project; index: number }) {
  return (
    <article id={project.slug} aria-labelledby={`${project.slug}-title`} data-reveal className="card group grid overflow-hidden md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2 md:aspect-auto md:border-b-0 md:border-r">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          priority={index === 0}
          sizes="(min-width: 768px) 380px, 92vw"
          className="object-cover object-top transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-fg-subtle">
          <span aria-hidden="true">artifact #{index + 1}</span>
          {project.inDevelopment ? (
            <span className="inline-flex items-center gap-1.5 text-warn">
              <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-warn" />
              building · in development
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-ok">
              <span aria-hidden="true">✓</span> built · shipped
            </span>
          )}
        </p>
        <h3 id={`${project.slug}-title`} className="display mt-3 text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 leading-relaxed text-fg-muted">{project.description}</p>
        <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech}>
              <TechTag name={tech} item={findTech(tech, stack)} />
            </li>
          ))}
        </ul>
        {(project.github || project.siteLink) && (
          <p className="mt-auto flex flex-wrap gap-2 pt-6">
            {project.siteLink && (
              <a href={project.siteLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent-strong px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                Live site ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:border-fg-subtle">
                Code ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </p>
        )}
      </div>
    </article>
  );
}

/** Stage 03 · build — the projects, as artifacts. */
export function Build() {
  return (
    <div className="mt-10 space-y-5">
      {projects.map((project, i) => (
        <Artifact key={project.slug} project={project} index={i} />
      ))}
    </div>
  );
}
