"use client";

import { STAGES } from "../../data/pipeline";
import { usePipeline } from "../../lib/pipeline-progress";
import { summarize } from "../../lib/pipeline-state";

/** Header badge with the live pipeline status: "running 3/6 · build", then "passed 6/6". */
export function PipelineBadge() {
  const { states } = usePipeline();
  const { label, done, total, state } = summarize(STAGES, states);
  const color = state === "passed" ? "bg-ok" : state === "running" ? "bg-warn pulse-dot" : "bg-fg-subtle";
  return (
    <p className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-fg-muted" data-testid="pipeline-badge">
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${color}`} />
      <span>
        <span className="max-sm:hidden">pipeline </span>
        {label}
      </span>
      <span aria-hidden="true" className="ml-1 hidden h-1 w-16 overflow-hidden rounded-full bg-surface-2 sm:block">
        <span className="block h-full bg-ok transition-[width] duration-300" style={{ width: `${(done / total) * 100}%` }} />
      </span>
    </p>
  );
}
