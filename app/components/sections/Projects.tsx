import Image from "next/image";
import { projects } from "../../data/projects";
import type { Project } from "../../data/types";
import { ButtonLink } from "../ui/ButtonLink";
import { Section } from "../ui/Section";
import { ProjectsGallery } from "./ProjectsGallery";

function ProjectCard({ project, priority }: { project: Project; priority: boolean }) {
  return (
    <li className="w-[86vw] max-w-[680px] shrink-0 snap-start">
      <article id={project.slug} aria-labelledby={`${project.slug}-title`} className="flex h-full flex-col overflow-hidden rounded-[28px] bg-paper">
        <div className="relative aspect-[16/10] overflow-hidden bg-hairline-light">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            priority={priority}
            sizes="(min-width: 768px) 680px, 86vw"
            className="object-cover object-top transition-transform duration-700 [transition-timing-function:var(--ease-apple)] hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-7 sm:p-9">
          {project.inDevelopment && <p className="text-sm font-semibold text-warn">In development</p>}
          <h3 id={`${project.slug}-title`} className="headline mt-1 text-[clamp(1.75rem,3vw,2.25rem)]">
            {project.title}
          </h3>
          <p className="mt-3 text-[17px] leading-snug text-mute-light">{project.description}</p>
          <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech} className="rounded-full bg-white px-3 py-1 text-[13px] text-graphite">
                {tech}
              </li>
            ))}
          </ul>
          {(project.github || project.siteLink) && (
            <p className="mt-auto flex flex-wrap gap-6 pt-7">
              {project.github && (
                <ButtonLink href={project.github} variant="link" tone="light" external>
                  Code
                </ButtonLink>
              )}
              {project.siteLink && (
                <ButtonLink href={project.siteLink} variant="link" tone="light" external>
                  Live site
                </ButtonLink>
              )}
            </p>
          )}
        </div>
      </article>
    </li>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Selected work." tone="light" intro="Things I've built, from AI products to the pipeline behind this site.">
      <ProjectsGallery>
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i === 0} />
        ))}
      </ProjectsGallery>
    </Section>
  );
}
