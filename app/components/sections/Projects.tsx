import Image from "next/image";
import { projects } from "../../data/projects";
import { SECTION_LABELS } from "../../data/ship";
import type { Project } from "../../data/types";
import { Section } from "../ui/Section";

function Status({ inDevelopment }: { inDevelopment?: boolean }) {
  return inDevelopment ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-warn">
      <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-warn" />
      Building
      <span className="sr-only"> (in development)</span>
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ok">
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ok" />
      Ready
    </span>
  );
}

function Deployment({ project, priority }: { project: Project; priority: boolean }) {
  return (
    <article
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      data-reveal
      className="group grid gap-5 rounded-ui border border-line bg-surface p-4 transition-colors hover:border-fg-subtle sm:p-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-7"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(var(--r)*0.6)] border border-line bg-surface-2">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          priority={priority}
          sizes="(min-width: 768px) 440px, 92vw"
          className="object-cover object-top transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 id={`${project.slug}-title`} className="text-2xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <Status inDevelopment={project.inDevelopment} />
        </div>
        <p className="mt-1 font-mono text-xs text-fg-subtle">{project.siteLink ? new URL(project.siteLink).host : `github.com${new URL(project.github ?? "https://github.com").pathname}`}</p>
        <p className="mt-4 leading-relaxed text-fg-muted">{project.description}</p>
        <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded-[calc(var(--r)*0.5)] bg-surface-2 px-2 py-1 font-mono text-[11px] text-fg-muted">
              {tech}
            </li>
          ))}
        </ul>
        {(project.github || project.siteLink) && (
          <p className="mt-auto flex flex-wrap gap-2 pt-5">
            {project.siteLink && (
              <a
                href={project.siteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-ui bg-fg px-3 py-1.5 text-sm font-medium text-bg hover:opacity-85"
              >
                Live site<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-ui border border-line px-3 py-1.5 text-sm font-medium hover:border-fg-subtle"
              >
                Code<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </p>
        )}
      </div>
    </article>
  );
}

/** Projects as a deployments dashboard: preview, status (Ready / Building), domain, stack and links. */
export function Projects() {
  return (
    <Section id="projects" label={SECTION_LABELS.projects} title="Selected work">
      <div className="mx-auto mt-12 grid max-w-6xl gap-4 px-5 sm:px-8">
        {projects.map((project, i) => (
          <Deployment key={project.slug} project={project} priority={i === 0} />
        ))}
      </div>
    </Section>
  );
}
