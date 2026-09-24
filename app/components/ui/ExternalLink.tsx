import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "./icons";

/** Inline text link to another site: new tab, safe rel, visible affordance. */
export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-accent underline-offset-4 hover:underline"
    >
      {children}
      <ArrowUpRightIcon width={14} height={14} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
