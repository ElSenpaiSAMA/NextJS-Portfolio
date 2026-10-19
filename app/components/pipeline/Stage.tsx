import type { ReactNode } from "react";
import type { Stage as StageInfo } from "../../data/pipeline";
import type { LogLine } from "../../lib/stage-logs";
import { StageLog } from "./StageLog";
import { StageNode } from "./StageNode";

interface StageProps {
  stage: StageInfo;
  index: number;
  total: number;
  log: LogLine[];
  /** The hero's title is the page's h1. */
  titleAs?: "h1" | "h2";
  /** Overrides the title text (e.g. the hero's big name). */
  title?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * One pipeline stage = one page section: its node on the spine, the step
 * label ("stage 02/06 · install — resolve the tools I work with"), the title,
 * its log, then the content.
 */
export function Stage({ stage, index, total, log, titleAs = "h2", title, className = "", children }: StageProps) {
  const Heading = titleAs;
  const headingId = `${stage.id}-heading`;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <section id={stage.id} aria-labelledby={headingId} data-stage={stage.id} className={`relative scroll-mt-20 py-16 sm:py-20 ${className}`}>
      <StageNode id={stage.id} step={stage.step} />
      <p className="font-mono text-xs text-fg-subtle">
        <span aria-hidden="true">
          stage {pad(index + 1)}/{pad(total)} ·{" "}
        </span>
        <span className="text-accent-text">{stage.step}</span>
        <span aria-hidden="true"> — {stage.meaning}</span>
      </p>
      <Heading id={headingId} data-rise className={titleAs === "h1" ? "display mt-4 text-[clamp(3.25rem,9vw,7rem)]" : "display mt-3 text-[clamp(2.5rem,6vw,4.5rem)]"}>
        {title ?? stage.title}
      </Heading>
      <StageLog id={stage.id} lines={log} />
      {children}
    </section>
  );
}
