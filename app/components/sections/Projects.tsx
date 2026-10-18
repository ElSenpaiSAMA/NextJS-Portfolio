import { projects } from "../../data/projects";
import { Section } from "../ui/Section";
import { ProjectPoster } from "./ProjectPoster";
import { ProjectsTrack } from "./ProjectsTrack";

export function Projects() {
  return (
    <Section id="projects" title="Selected work" className="pt-28 sm:pt-40">
      <ProjectsTrack>
        {projects.map((project, i) => (
          <ProjectPoster key={project.slug} project={project} priority={i === 0} />
        ))}
      </ProjectsTrack>
    </Section>
  );
}
