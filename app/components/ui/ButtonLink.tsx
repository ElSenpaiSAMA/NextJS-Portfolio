import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  download?: boolean;
  /** Label the custom cursor shows over this link. */
  cursor?: string;
}

const STYLES: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-fg",
  ghost: "border border-line bg-ink-2/60 text-fg backdrop-blur hover:border-accent hover:text-accent",
};

/** Mono pill link. `data-magnetic`: it leans towards the pointer (ScrollChoreography). */
export function ButtonLink({ href, children, variant = "ghost", external = false, download = false, cursor }: ButtonLinkProps) {
  return (
    <a
      href={href}
      data-magnetic
      data-cursor={cursor}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-sm transition-colors ${STYLES[variant]}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
    >
      {children}
    </a>
  );
}
