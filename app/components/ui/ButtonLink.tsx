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

const STYLES: Record<Variant, string> = {
  primary: "bg-ok text-bg hover:opacity-90",
  secondary: "border border-line bg-surface text-fg hover:border-ok",
};

/** Terminal-style button link: green primary, outlined secondary. */
export function ButtonLink({ href, children, variant = "secondary", external = false, download = false }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-bold transition-[opacity,border-color] ${STYLES[variant]}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
    >
      {children}
    </a>
  );
}
