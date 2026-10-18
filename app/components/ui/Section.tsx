import type { ReactNode } from "react";
import { SECTION_COMMANDS } from "../../data/console";
import type { SectionId } from "../../lib/site";

interface SectionProps {
  id: SectionId;
  title: string;
  /** One plain sentence under the title. */
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * A page section opened by the shell command that "prints" it (decorative,
 * aria-hidden), then the real h2. Spacing is set per section on purpose.
 */
export function Section({ id, title, intro, className = "", children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-16 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p aria-hidden="true" data-command className="w-fit font-mono text-sm text-fg-subtle">
          <span className="text-amber">$</span> {SECTION_COMMANDS[id]}
        </p>
        <h2 id={headingId} data-section-title className="mt-3 font-mono text-[clamp(2.25rem,6vw,4.25rem)] font-bold leading-none tracking-tight text-fg">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{intro}</p>}
      </div>
      {children}
    </section>
  );
}
