import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  /** What this section is in a developer's world, shown small above the title. */
  label: string;
  title: string;
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** A page section: mono label, big title (rises in on scroll), optional intro, content. */
export function Section({ id, label, title, intro, className = "", children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-16 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{label}</p>
        <h2 id={headingId} data-rise className="display mt-3 text-[clamp(2.5rem,6.5vw,5rem)]">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{intro}</p>}
      </div>
      {children}
    </section>
  );
}
