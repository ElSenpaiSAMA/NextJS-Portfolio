"use client";

import type { CSSProperties } from "react";
import { MOTION_QUERY, useMediaQuery } from "../../lib/motion";
import { usePipeline } from "../../lib/pipeline-progress";

/**
 * The command at a section's prompt. With motion it waits until the reader
 * reaches the section (its stage starts running) and then types itself out
 * (CSS `.typed`); on the server, without JS and with reduced motion it's just
 * there.
 */
export function TypedCommand({ stageId, command }: { stageId: string; command: string }) {
  const motion = useMediaQuery(MOTION_QUERY);
  const state = usePipeline().states[stageId];
  const started = state === "running" || state === "passed";
  const run = motion ? (started ? "go" : "wait") : undefined;
  return (
    <>
      <span className="typed text-fg" data-run={run} style={{ "--chars": command.length } as CSSProperties}>
        {command}
      </span>
      {/* The prompt that's waiting for the reader blinks. */}
      {run === "wait" && <span aria-hidden="true" className="caret" />}
    </>
  );
}
