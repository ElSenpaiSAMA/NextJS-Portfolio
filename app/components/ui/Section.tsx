import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  /** Where this section "lives" in the source tree, shown small above the title. */
  path: string;
  title: string;
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * A page section: a mono path label, then the title, which decodes letter by
 * letter when it scrolls in (`data-scramble`, see ScrollChoreography). The
 * heading's accessible name is set once with aria-label, so screen readers
 * never hear the scrambled frames.
 */
export function Section({ id, path, title, intro, className = "", children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-14 py-28 sm:py-36 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p aria-hidden="true" className="font-mono text-sm text-fg-subtle">
          <span className="text-accent">~/</span>
          {path}
        </p>
        <h2 id={headingId} aria-label={title} className="display mt-4 text-[clamp(3rem,9vw,7.5rem)]">
          <span aria-hidden="true" data-scramble>
            {title}
          </span>
        </h2>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">{intro}</p>}
      </div>
      {children}
    </section>
  );
}
