import { projects } from "../../data/projects";
import { Section } from "../ui/Section";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <Section id="projects" eyebrow="Selected work" title="Projects" tinted>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
