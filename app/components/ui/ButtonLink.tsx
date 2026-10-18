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
  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-[background-color,color,border-color] duration-200";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-haze text-night hover:bg-sunset",
  secondary: "border border-haze/30 bg-night/40 text-haze backdrop-blur hover:border-sunset hover:text-sunset",
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
