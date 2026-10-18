import type { ReactNode } from "react";
import type { SectionId } from "../../lib/site";

interface SectionProps {
  id: SectionId;
  title: string;
  /** One plain sentence under the title; no eyebrow labels. */
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** A page section with a big signage-style title. Spacing is set per section on purpose. */
export function Section({ id, title, intro, className = "", children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`relative ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 id={headingId} className="display text-[clamp(3.25rem,10vw,9rem)] text-haze">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-xl text-lg leading-relaxed text-haze-muted">{intro}</p>}
      </div>
      {children}
    </section>
  );
}
