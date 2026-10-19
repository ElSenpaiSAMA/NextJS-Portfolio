import type { ReactNode } from "react";
import { ChevronRightIcon } from "./icons";

type Variant = "pill" | "link";
type Tone = "dark" | "light";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  /** pill: blue filled button. link: text link with a chevron (Apple's "Learn more >"). */
  variant?: Variant;
  /** Background the link sits on, for its colour. */
  tone?: Tone;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  download?: boolean;
}

const STYLES: Record<Variant, Record<Tone, string>> = {
  pill: {
    dark: "rounded-full bg-blue px-5 py-2.5 text-white hover:bg-[#0077ed]",
    light: "rounded-full bg-blue px-5 py-2.5 text-white hover:bg-[#0077ed]",
  },
  link: {
    dark: "text-link-dark hover:underline",
    light: "text-link-light hover:underline",
  },
};

export function ButtonLink({ href, children, variant = "pill", tone = "dark", external = false, download = false }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1.5 text-[17px] font-normal transition-colors ${STYLES[variant][tone]}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
    >
      {children}
      {variant === "link" && <ChevronRightIcon width={12} height={12} />}
    </a>
  );
}
