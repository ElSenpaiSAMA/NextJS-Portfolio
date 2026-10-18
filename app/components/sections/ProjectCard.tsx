import Image from "next/image";
import type { Project } from "../../data/types";
import { ExternalLink } from "../ui/ExternalLink";
import { Window } from "../ui/Window";

/** A project as a window on its repository: path in the title bar, screenshot, then the README bits. */
export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const status = project.inDevelopment ? (
    <span className="shrink-0 rounded border border-amber/40 px-2 py-0.5 text-amber">in development</span>
  ) : null;

  return (
    <article data-reveal id={project.slug} aria-labelledby={`${project.slug}-title`} className={featured ? "md:col-span-2" : undefined}>
      <Window
        title={<span aria-hidden="true">~/projects/{project.slug}</span>}
        aside={status}
        className="group h-full transition-colors hover:border-fg-subtle"
        bodyClassName={featured ? "grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : undefined}
      >
        <div className={`relative overflow-hidden border-line bg-console ${featured ? "aspect-[16/10] md:aspect-auto md:min-h-[22rem] md:border-r" : "aspect-[16/10] border-b"}`}>
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            priority={featured}
            sizes={featured ? "(min-width: 768px) 40rem, 92vw" : "(min-width: 768px) 34rem, 92vw"}
            className="object-cover object-top opacity-90 transition-[opacity,transform] duration-500 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.02] group-hover:opacity-100"
          />
        </div>

        <div className="flex flex-col p-6">
          <h3 id={`${project.slug}-title`} className="font-mono text-2xl font-bold tracking-tight text-fg">
            {project.title}
          </h3>
          <p className="mt-3 leading-relaxed text-fg-muted">{project.description}</p>
          <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
            {project.tech.map((tech) => (
              <li key={tech} className="rounded border border-line bg-panel-bar px-2 py-1 text-cyan">
                {tech}
              </li>
            ))}
          </ul>
          {(project.github || project.siteLink) && (
            <p className="mt-auto flex flex-wrap gap-6 pt-6 text-sm">
              {project.github && <ExternalLink href={project.github}>Code</ExternalLink>}
              {project.siteLink && <ExternalLink href={project.siteLink}>Live site</ExternalLink>}
            </p>
          )}
        </div>
      </Window>
    </article>
  );
}
