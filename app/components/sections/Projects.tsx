import { projects } from "../../data/projects";
import { Section } from "../ui/Section";
import { ProjectCard } from "./ProjectCard";

/** The first project leads full width, the rest follow two by two; a leftover last one also goes wide. */
export function Projects() {
  return (
    <Section id="projects" title="Selected work" className="pt-24 sm:pt-32">
      <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-5 sm:px-8 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} featured={i === 0 || (i === projects.length - 1 && projects.length % 2 === 0)} />
        ))}
      </div>
    </Section>
  );
}
