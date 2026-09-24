import type { Metadata } from "next";
import { ProjectList } from "../components/projects/ProjectList";
import { RoadmapList } from "../components/projects/RoadmapList";
import { Block } from "../components/ui/Block";
import { PageHeader } from "../components/ui/PageHeader";
import { projects } from "../data/projects";
import { roadmap } from "../data/roadmap";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies read from an operations angle: how each project is built, shipped, and what it still lacks.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const caseStudies = projects.filter((p) => p.featured);
  const earlier = projects.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects"
        intro="Each project is written up from an operations angle: how it is built and shipped, what I learned, and what it still needs to be solid DevOps evidence."
      />

      <Block title="Case studies">
        <ProjectList projects={caseStudies} />
      </Block>

      {earlier.length > 0 && (
        <Block title="Earlier projects">
          <p className="mb-6 text-muted">Application work from my backend and fullstack background, with the steps that would make each one production-ready.</p>
          <ProjectList projects={earlier} />
        </Block>
      )}

      <Block title="Roadmap" id="roadmap">
        <p className="mb-8 text-muted">
          What I am building next to close my gaps, ordered by impact. Each item moves to case studies once its repository is public.
        </p>
        <RoadmapList items={roadmap} />
      </Block>
    </>
  );
}
