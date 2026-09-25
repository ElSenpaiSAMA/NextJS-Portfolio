import Image from "next/image";
import type { Project } from "../../data/types";
import { ExternalLink } from "../ui/ExternalLink";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      className="flex flex-col overflow-hidden rounded-lg border border-border bg-bg transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] border-b border-border bg-surface">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />
        {project.inDevelopment && (
          <span className="absolute right-3 top-3 rounded bg-bg/95 px-2 py-0.5 text-xs font-semibold text-warn">
            In development
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 id={`${project.slug}-title`} className="text-lg font-semibold">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
              {tech}
            </li>
          ))}
        </ul>

        {(project.github || project.siteLink) && (
          <p className="mt-5 flex flex-wrap gap-5 border-t border-border pt-4 text-sm">
            {project.github && <ExternalLink href={project.github}>Code</ExternalLink>}
            {project.siteLink && <ExternalLink href={project.siteLink}>Live site</ExternalLink>}
          </p>
        )}
      </div>
    </article>
  );
}
