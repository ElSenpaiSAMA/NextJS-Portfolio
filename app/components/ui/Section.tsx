import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  /** Position in the nav (01–05); omitted for sections outside it. */
  index?: number;
  title: string;
  /** Handwritten aside under the title. */
  tagline?: string;
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** A page section: numbered badge + title, a handwritten tagline, an intro, then its content. */
export function Section({ id, index, title, tagline, intro, className = "", children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} data-companion-section={id} className={`scroll-mt-24 py-20 sm:py-24 ${className}`}>
      <div className="flex items-center gap-4" data-rise>
        {index !== undefined && (
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 -rotate-3 items-center justify-center rounded-xl border-2 border-fg/80 font-mono text-lg font-semibold"
          >
            {String(index).padStart(2, "0")}
          </span>
        )}
        <h2 id={headingId} className="display text-[clamp(2.25rem,5vw,3.5rem)]">
          {title}
        </h2>
      </div>
      {tagline && (
        <p className="hand mt-3 pl-1 text-2xl text-fg-muted sm:text-[1.7rem]">
          {tagline}
        </p>
      )}
      {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{intro}</p>}
      {children}
    </section>
  );
}
