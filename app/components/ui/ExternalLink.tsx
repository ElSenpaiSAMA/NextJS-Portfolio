import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "./icons";

/** Inline link to another site: new tab, safe rel, visible affordance for sighted and SR users. */
export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-accent underline-offset-4 hover:underline"
    >
      {children}
      <ArrowUpRightIcon width={13} height={13} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
