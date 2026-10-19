import Image from "next/image";
import type { CSSProperties } from "react";
import { projects } from "../../data/projects";
import { SECTION_PATHS } from "../../data/source";
import type { Project } from "../../data/types";
import { Section } from "../ui/Section";

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <article
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      data-cursor="view"
      className="group flex w-[86vw] shrink-0 flex-col sm:w-[70vw] lg:w-[46vw]"
    >
      <div className="glitch relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-ink-2" style={{ "--glitch-image": `url(${project.image})` } as CSSProperties}>
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(min-width: 1024px) 46vw, (min-width: 640px) 70vw, 86vw"
          className="object-cover object-top transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 font-mono text-xs text-fg-subtle">
        <span aria-hidden="true">
          {pad(index + 1)} / {pad(total)}
        </span>
        {project.inDevelopment && <span className="rounded-full border border-amber/40 px-2 py-0.5 text-amber">in development</span>}
      </div>
      <h3 id={`${project.slug}-title`} aria-label={project.title} className="display mt-2 text-[clamp(2rem,4vw,3.25rem)]">
        <span aria-hidden="true" data-scramble-hover>
          {project.title}
        </span>
      </h3>
      <p className="mt-3 max-w-xl leading-relaxed text-fg-muted">{project.description}</p>
      <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
        {project.tech.map((tech) => (
          <li key={tech} className="rounded-full border border-line px-2.5 py-1 text-fg-muted">
            {tech}
          </li>
        ))}
      </ul>
      {(project.github || project.siteLink) && (
        <p className="mt-5 flex flex-wrap gap-5 font-mono text-sm">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor="code" className="text-accent underline-offset-4 hover:underline">
              Code ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {project.siteLink && (
            <a href={project.siteLink} target="_blank" rel="noopener noreferrer" data-cursor="open" className="text-accent underline-offset-4 hover:underline">
              Live site ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </p>
      )}
    </article>
  );
}

/** Pinned horizontal run on desktop (ScrollChoreography `[data-track]`); a vertical list elsewhere. */
export function Projects() {
  return (
    <Section id="projects" path={SECTION_PATHS.projects} title="Selected work" className="bg-ink">
      <div data-track-viewport className="mt-14 overflow-hidden">
        <div data-track className="flex flex-col gap-16 px-5 sm:px-8 md:w-max md:flex-row md:gap-10 md:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] md:pr-[10vw]">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </Section>
  );
}
