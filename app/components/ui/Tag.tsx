import type { ReactNode } from "react";

export type TagTone = "neutral" | "accent" | "ok" | "warn" | "info";

const TONES: Record<TagTone, string> = {
  neutral: "border-border text-muted",
  accent: "border-accent/40 text-accent",
  ok: "border-ok/40 text-ok",
  warn: "border-warn/40 text-warn",
  info: "border-info/40 text-info",
};

export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: TagTone }) {
  return (
    <span className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-xs ${TONES[tone]}`}>
      {children}
    </span>
  );
}
