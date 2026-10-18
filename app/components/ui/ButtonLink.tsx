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
  "inline-flex items-center gap-2 rounded-md px-3.5 py-2.5 font-mono text-sm font-medium transition-[background-color,color,border-color] duration-200";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-amber text-console hover:bg-fg",
  secondary: "border border-line bg-panel text-fg hover:border-amber hover:text-amber",
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
