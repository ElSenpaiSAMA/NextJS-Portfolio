import type { ReactNode } from "react";
import type { SectionId } from "../../lib/site";

interface SectionProps {
  id: SectionId;
  /** Two-digit index shown before the title, e.g. "01". */
  index: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}

export function Section({ id, index, title, intro, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <h2 id={headingId} className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="font-mono text-sm font-normal text-accent" aria-hidden="true">
            {index}
          </span>
          {title}
        </h2>
        {intro && <div className="mt-3 max-w-2xl text-muted">{intro}</div>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
