import { projects } from "../../data/projects";
import { Section } from "../ui/Section";
import { CaseStudy, ProjectCard } from "./CaseStudy";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      index="02"
      title="Projects"
      intro="Case studies read from an operations angle: how each project is built, shipped and what it still lacks."
    >
      <div className="space-y-8">
        {featured.map((project) => (
          <CaseStudy key={project.slug} project={project} />
        ))}
      </div>

      {others.length > 0 && (
        <>
          <h3 className="mb-4 mt-14 font-semibold">Earlier application projects</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {others.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </>
      )}
    </Section>
  );
}
