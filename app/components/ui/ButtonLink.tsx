import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  download?: boolean;
}

const BASE =
  "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:opacity-90",
  secondary: "border border-border bg-surface text-fg hover:border-accent",
};

export function ButtonLink({ href, children, variant = "secondary", external = false, download = false }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`${BASE} ${VARIANTS[variant]}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
    >
      {children}
    </a>
  );
}
