import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Small label above the title, e.g. "Work". */
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}

/** The single h1 of every page. */
export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <header className="pb-12 pt-16 sm:pt-24">
      {eyebrow && <p className="label mb-4">{eyebrow}</p>}
      <h1 className="font-serif text-4xl font-normal leading-tight tracking-tight sm:text-5xl">{title}</h1>
      {intro && <div className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{intro}</div>}
      {children}
    </header>
  );
}
