"use client";

import { STAGES } from "../../data/pipeline";
import { usePipeline } from "../../lib/pipeline-progress";
import type { LogLine } from "../../lib/stage-logs";

/**
 * `make deploy`'s output: one line per stage of the session, ticking green as
 * the reader passes each section (the summary is that stage's log, computed
 * from the real content). The last step always waits for the reader's
 * approval: the contact form below. Decorative; the content is on the page.
 */
export function DeployRun({ logs }: { logs: Record<string, LogLine[]> }) {
  const { states } = usePipeline();
  return (
    <ol aria-hidden="true" className="mt-8 max-w-3xl space-y-1 rounded-ui border border-line bg-surface px-4 py-4 text-[13px] leading-relaxed sm:px-5" data-testid="deploy-run">
      {STAGES.map((stage) => {
        const last = stage.id === "contact";
        const state = states[stage.id] ?? "pending";
        const summary = logs[stage.id]?.find((l) => l.kind === "ok")?.text ?? stage.meaning;
        if (last) {
          return (
            <li key={stage.id} className="whitespace-pre-wrap text-warn">
              <span className="pulse-dot">●</span> {stage.step.padEnd(9)} waiting for your approval
            </li>
          );
        }
        return (
          <li key={stage.id} data-state={state} className="whitespace-pre-wrap text-fg-subtle data-[state=passed]:text-fg-muted">
            <span className={state === "passed" ? "text-ok" : state === "running" ? "text-warn" : ""}>{state === "passed" ? "✓" : state === "running" ? "●" : "○"}</span>{" "}
            <span className={state === "passed" ? "text-fg" : ""}>{stage.step.padEnd(9)}</span> {summary}
          </li>
        );
      })}
    </ol>
  );
}
