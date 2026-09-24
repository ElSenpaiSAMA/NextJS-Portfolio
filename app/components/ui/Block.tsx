import type { ReactNode } from "react";

interface BlockProps {
  title: string;
  /** Anchor id; also links the heading via aria-labelledby. */
  id?: string;
  children: ReactNode;
}

/**
 * A titled section of a page, separated by a hairline. On wide screens the
 * title sits in a narrow left column — a calm, document-like rhythm.
 */
export function Block({ title, id, children }: BlockProps) {
  const headingId = `${id ?? slugify(title)}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="grid gap-4 border-t border-border py-10 sm:grid-cols-[10rem_1fr] sm:gap-10">
      <h2 id={headingId} className="label pt-1">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
