import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "../../components/projects/ArchitectureDiagram";
import { Block } from "../../components/ui/Block";
import { ExternalLink } from "../../components/ui/ExternalLink";
import { ArrowLeftIcon } from "../../components/ui/icons";
import { TextLink } from "../../components/ui/TextLink";
import { profile } from "../../data/profile";
import { findProject, projects } from "../../data/projects";
import { projectHref } from "../../lib/site";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Only the known case studies exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = findProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: projectHref(project.slug) },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const nextProject = projects[(index + 1) % projects.length];
  const { repo, demo } = project.links;

  return (
    <article>
      <header className="pb-12 pt-12 sm:pt-16">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeftIcon width={14} height={14} /> All projects
        </Link>
        <h1 className="mt-10 font-serif text-4xl font-normal leading-tight tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-xl text-xl leading-relaxed text-muted">{project.tagline}</p>
        {(repo || demo) && (
          <p className="mt-6 flex flex-wrap gap-6">
            {repo && <ExternalLink href={repo}>Repository</ExternalLink>}
            {demo && <ExternalLink href={demo}>Live demo</ExternalLink>}
          </p>
        )}
      </header>

      <Block title="Problem">
        <p className="leading-relaxed">{project.problem}</p>
      </Block>
      <Block title="Solution">
        <p className="leading-relaxed">{project.solution}</p>
      </Block>
      <Block title="Architecture">
        <ArchitectureDiagram nodes={project.architecture} title={project.title} />
      </Block>
      <Block title="Stack">
        <p className="leading-relaxed">{project.stack.join(" · ")}</p>
      </Block>
      <Block title="How it deploys">
        <p className="leading-relaxed">{project.deployment}</p>
      </Block>
      <Block title="Outcome">
        <p className="leading-relaxed">{project.outcome}</p>
        {project.slug === "portfolio" && (
          <a href={profile.ciWorkflowUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
            {/* Live status from GitHub — an external SVG, so next/image adds nothing here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.ciBadgeUrl} alt="Current CI pipeline status" height={20} width={90} className="h-5 w-auto" />
          </a>
        )}
      </Block>
      <Block title="What it still needs">
        <ul className="list-disc space-y-2 pl-5 marker:text-border">
          {project.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </Block>

      {nextProject && nextProject.slug !== project.slug && (
        <nav aria-label="More projects" className="border-t border-border pt-10">
          <p className="label mb-2">Next project</p>
          <TextLink href={projectHref(nextProject.slug)}>{nextProject.title}</TextLink>
        </nav>
      )}
    </article>
  );
}
