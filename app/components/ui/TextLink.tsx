import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

/** Internal navigation link with a trailing arrow, e.g. "All projects →". */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1.5 font-medium text-accent">
      <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-accent">
        {children}
      </span>
      <ArrowRightIcon width={14} height={14} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
