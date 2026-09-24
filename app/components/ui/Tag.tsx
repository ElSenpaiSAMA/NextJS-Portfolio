import type { ReactNode } from "react";

export type TagTone = "neutral" | "accent" | "ok" | "warn" | "info";

const DOT: Record<TagTone, string> = {
  neutral: "bg-subtle",
  accent: "bg-accent",
  ok: "bg-ok",
  warn: "bg-warn",
  info: "bg-info",
};

const TEXT: Record<TagTone, string> = {
  neutral: "text-subtle",
  accent: "text-accent",
  ok: "text-ok",
  warn: "text-warn",
  info: "text-info",
};

/** Quiet status marker: a coloured dot and a short label, no box. */
export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: TagTone }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${TEXT[tone]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[tone]}`} aria-hidden="true" />
      {children}
    </span>
  );
}
