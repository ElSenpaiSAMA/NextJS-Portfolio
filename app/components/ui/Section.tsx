import type { ReactNode } from "react";
import type { SectionId } from "../../lib/site";

interface SectionProps {
  id: SectionId;
  /** Small label above the title, e.g. "Selected work". */
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  /** Alternates the background to separate consecutive sections. */
  tinted?: boolean;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, intro, tinted = false, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`border-t border-border py-20 sm:py-24 ${tinted ? "bg-surface" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="label">{eyebrow}</p>
        <h2 id={headingId} className="mt-2 text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        {intro && <div className="mt-3 max-w-2xl text-muted">{intro}</div>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
