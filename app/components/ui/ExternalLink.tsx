import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "./icons";

/** Link to another site: new tab, safe rel, visible affordance for sighted and SR users. */
export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-fg underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
    >
      {children}
      <ArrowUpRightIcon width={13} height={13} className="text-subtle" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
