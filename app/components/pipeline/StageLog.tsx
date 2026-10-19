"use client";

import { useEffect, useState } from "react";
import type { LogLine } from "../../lib/stage-logs";
import { MOTION_QUERY, useMediaQuery } from "../../lib/motion";
import { usePipeline } from "../../lib/pipeline-progress";

/**
 * The stage's log: empty while the stage is pending, printed line by line the
 * first time it runs (then it stays). Reduced motion — and no JavaScript —
 * show the whole log. Decorative: the same facts are in the section itself.
 */
export function StageLog({ id, lines }: { id: string; lines: LogLine[] }) {
  const motion = useMediaQuery(MOTION_QUERY);
  const state = usePipeline().states[id];
  const started = state === "running" || state === "passed";
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!motion || !started) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown((n) => Math.max(n, i));
      if (i >= lines.length) window.clearInterval(id);
    }, 260);
    return () => window.clearInterval(id);
  }, [motion, started, lines.length]);

  // Server and no-motion render: the full log. With motion: what has printed so far.
  const visible = motion ? lines.slice(0, shown) : lines;

  return (
    <ol aria-hidden="true" className="mt-5 min-h-[5.5rem] max-w-xl rounded-lg border border-line bg-surface px-4 py-3 font-mono text-[12px] leading-relaxed" data-testid={`log-${id}`}>
      {visible.map((line) => (
        <li key={line.text} className={line.kind === "cmd" ? "text-fg" : line.kind === "ok" ? "text-ok" : "text-fg-muted"}>
          {line.kind === "cmd" ? "$ " : line.kind === "ok" ? "✓ " : "  "}
          {line.text}
        </li>
      ))}
      {motion && !started && <li className="text-fg-subtle">waiting for previous stage…</li>}
    </ol>
  );
}
