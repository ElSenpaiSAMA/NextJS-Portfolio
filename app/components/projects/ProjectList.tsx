import Link from "next/link";
import type { CaseStudy } from "../../data/types";
import { projectHref } from "../../lib/site";
import { ArrowRightIcon } from "../ui/icons";

/** A plain list of projects: each row links to its case study page. */
export function ProjectList({ projects, showStack = true }: { projects: CaseStudy[]; showStack?: boolean }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link href={projectHref(project.slug)} className="group flex items-start justify-between gap-6 py-5">
            <div className="min-w-0">
              <p className="font-serif text-xl tracking-tight transition-colors group-hover:text-accent">{project.title}</p>
              <p className="mt-1 text-muted">{project.tagline}</p>
              {showStack && <p className="mt-2 text-sm text-subtle">{project.stack.slice(0, 4).join(" · ")}</p>}
            </div>
            <ArrowRightIcon
              width={18}
              height={18}
              className="mt-1.5 shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
