"use client";

import { usePipeline } from "../../lib/pipeline-progress";
import type { StageState } from "../../lib/pipeline-state";

const LABEL: Record<StageState, string> = { pending: "pending", running: "running", passed: "passed" };

/** The stage's node on the spine: dashed ring (pending), spinning amber ring (running), green check (passed). */
export function StageNode({ id, step }: { id: string; step: string }) {
  const state: StageState = usePipeline().states[id] ?? "pending";
  return (
    <span
      data-state={state}
      data-testid={`node-${id}`}
      className="absolute -left-[44px] top-[60px] flex h-6 w-6 items-center justify-center rounded-full border bg-bg transition-colors duration-300 data-[state=passed]:border-ok data-[state=pending]:border-dashed data-[state=pending]:border-fg-subtle data-[state=running]:border-warn sm:-left-[68px] sm:top-[76px]"
    >
      <span className="sr-only">
        Stage {step}: {LABEL[state]}
      </span>
      {state === "passed" && (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 text-ok">
          <path d="m4 8.2 2.6 2.6L12 5.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {state === "running" && (
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 animate-spin text-warn motion-reduce:animate-none">
          <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="22 12" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}
