import type { ReactNode } from "react";
import type { CaseStudy as CaseStudyData } from "../../data/types";
import { ExternalLink } from "../ui/ExternalLink";
import { Tag } from "../ui/Tag";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

function ProjectLinks({ project }: { project: CaseStudyData }) {
  const { repo, demo } = project.links;
  if (!repo && !demo) return null;
  return (
    <p className="flex flex-wrap gap-4 text-sm">
      {repo && <ExternalLink href={repo}>Repository</ExternalLink>}
      {demo && <ExternalLink href={demo}>Live demo</ExternalLink>}
    </p>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-wider text-subtle">{label}</dt>
      <dd className="mt-1 leading-relaxed">{children}</dd>
    </div>
  );
}

function NextSteps({ steps }: { steps: string[] }) {
  return (
    <ul className="space-y-1.5">
      {steps.map((step) => (
        <li key={step} className="flex gap-2 text-sm text-muted">
          <span aria-hidden="true" className="font-mono text-warn">
            ○
          </span>
          {step}
        </li>
      ))}
    </ul>
  );
}

/** Full case study: problem → solution → architecture → stack → deploy → outcome → gaps. */
export function CaseStudy({ project }: { project: CaseStudyData }) {
  return (
    <article id={project.slug} aria-labelledby={`${project.slug}-title`} className="rounded-lg border border-border bg-surface p-5 sm:p-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 id={`${project.slug}-title`} className="text-xl font-semibold">
            {project.title}
          </h3>
          <p className="mt-1 text-muted">{project.tagline}</p>
        </div>
        <ProjectLinks project={project} />
      </header>

      <dl className="mt-8 grid gap-6 md:grid-cols-2">
        <Field label="Problem">{project.problem}</Field>
        <Field label="Solution">{project.solution}</Field>
      </dl>

      <div className="mt-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-subtle">Architecture</p>
        <ArchitectureDiagram nodes={project.architecture} title={project.title} />
      </div>

      <dl className="mt-8 grid gap-6 md:grid-cols-2">
        <Field label="Stack">
          <span className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </span>
        </Field>
        <Field label="How it deploys">{project.deployment}</Field>
        <Field label="Outcome & learning">{project.outcome}</Field>
        <Field label="What it still needs">
          <NextSteps steps={project.nextSteps} />
        </Field>
      </dl>
    </article>
  );
}

/** Compact card for non-featured projects: DevOps angle + gaps, full diagram omitted. */
export function ProjectCard({ project }: { project: CaseStudyData }) {
  return (
    <article id={project.slug} aria-labelledby={`${project.slug}-title`} className="flex flex-col rounded-lg border border-border bg-surface p-5">
      <h3 id={`${project.slug}-title`} className="font-semibold">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{project.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed">{project.solution}</p>
      <span className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </span>
      <p className="mt-5 font-mono text-xs uppercase tracking-wider text-subtle">To become DevOps evidence</p>
      <div className="mt-2 flex-1">
        <NextSteps steps={project.nextSteps} />
      </div>
      <div className="mt-5">
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
