import Image from "next/image";
import { projects } from "../../data/projects";
import { stack } from "../../data/stack";
import type { Project } from "../../data/types";
import { findTech } from "../../lib/tags";
import { TechTag } from "../ui/TechTag";

/** A project as its README in a terminal window: title bar with the path, screenshot, description, tech, links. */
function Readme({ project, index }: { project: Project; index: number }) {
  return (
    <article id={project.slug} aria-labelledby={`${project.slug}-title`} data-reveal className="card group scroll-mt-12 overflow-hidden">
      <p className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-2 text-xs text-fg-subtle">
        <span aria-hidden="true" className="truncate">
          ~/projects/{project.slug}/README.md
        </span>
        {project.inDevelopment ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 text-warn">
            <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-warn" />
            in development
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1.5 text-ok">
            <span aria-hidden="true">✓</span> shipped
          </span>
        )}
      </p>
      <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
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
          <h3 id={`${project.slug}-title`} className="display text-2xl sm:text-3xl">
            <span aria-hidden="true" className="text-fg-subtle">
              #{" "}
            </span>
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
                <a href={project.siteLink} target="_blank" rel="noopener noreferrer" className="rounded-md bg-ok px-4 py-2 text-sm font-bold text-bg hover:opacity-90">
                  Live site ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="rounded-md border border-line px-4 py-2 text-sm font-bold hover:border-ok">
                  Code ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/** `ls -l ~/projects` — the listing (each entry jumps to its README), then every README. */
export function Projects() {
  return (
    <>
      <ul aria-label="Project index" className="mt-8 space-y-1 overflow-x-auto text-sm">
        {projects.map((project) => (
          <li key={project.slug} className="whitespace-nowrap">
            <span aria-hidden="true" className="text-fg-subtle">
              drwxr-xr-x matias{" "}
            </span>
            <span className={project.inDevelopment ? "text-warn" : "text-ok"}>{project.inDevelopment ? "wip    " : "shipped"}</span>{" "}
            <a href={`#${project.slug}`} className="font-bold text-accent-text hover:underline">
              {project.slug}/
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-10 space-y-6">
        {projects.map((project, i) => (
          <Readme key={project.slug} project={project} index={i} />
        ))}
      </div>
    </>
  );
}
