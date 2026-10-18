import Image from "next/image";
import type { Project } from "../../data/types";
import { ExternalLink } from "../ui/ExternalLink";

/** Full-height poster: the screenshot fills the frame, the title sits on it like key art. */
export function ProjectPoster({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      className="group relative flex h-[72svh] min-h-[30rem] w-[86vw] shrink-0 flex-col justify-end overflow-hidden rounded-[2rem] bg-dusk sm:w-[70vw] lg:w-[52vw]"
    >
      <Image
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 52vw, (min-width: 640px) 70vw, 86vw"
        className="object-cover object-top opacity-70 transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.03] group-hover:opacity-90"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/10" />

      <div className="relative p-6 sm:p-10">
        {project.inDevelopment && (
          <span className="mb-4 inline-block rounded-full bg-warn px-3 py-1 text-xs font-semibold text-night">In development</span>
        )}
        <h3 id={`${project.slug}-title`} className="display text-[clamp(2.75rem,6vw,5.5rem)] text-haze">
          {project.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-haze-muted">{project.description}</p>
        <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded-full border border-haze/20 px-3 py-1 text-xs font-medium text-haze">
              {tech}
            </li>
          ))}
        </ul>
        {(project.github || project.siteLink) && (
          <p className="mt-6 flex flex-wrap gap-6 text-sm">
            {project.github && <ExternalLink href={project.github}>Code</ExternalLink>}
            {project.siteLink && <ExternalLink href={project.siteLink}>Live site</ExternalLink>}
          </p>
        )}
      </div>
    </article>
  );
}
