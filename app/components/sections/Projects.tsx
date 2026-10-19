import Image from "next/image";
import { projects } from "../../data/projects";
import { stack } from "../../data/stack";
import type { Project } from "../../data/types";
import { findTech } from "../../lib/tags";
import { Section } from "../ui/Section";
import { TechTag } from "../ui/TechTag";

function Status({ inDevelopment }: { inDevelopment?: boolean }) {
  return inDevelopment ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-warn/40 bg-warn/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-warn">
      <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-warn" />
      In development
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/40 bg-ok/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ok">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />
      Shipped
    </span>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <article
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      data-reveal
      className={`card group flex flex-col overflow-hidden ${featured ? "md:col-span-2 md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)]" : ""}`}
    >
      <div className={`relative overflow-hidden border-line bg-surface-2 ${featured ? "aspect-[16/10] border-b md:aspect-auto md:border-b-0 md:border-r" : "aspect-[16/10] border-b"}`}>
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          priority={featured}
          sizes={featured ? "(min-width: 768px) 520px, 92vw" : "(min-width: 768px) 420px, 92vw"}
          className="object-cover object-top transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Status inDevelopment={project.inDevelopment} />
        <h3 id={`${project.slug}-title`} className="display mt-4 text-3xl">
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

export function Projects() {
  return (
    <Section id="projects" index={2} title="Selected projects" tagline="things I built and keep building">
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} featured={i === 0 || (i === projects.length - 1 && projects.length % 2 === 0)} />
        ))}
      </div>
    </Section>
  );
}
