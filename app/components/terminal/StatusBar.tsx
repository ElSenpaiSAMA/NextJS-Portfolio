"use client";

import { useEffect, useRef } from "react";
import { STAGES } from "../../data/pipeline";
import { usePipeline } from "../../lib/pipeline-progress";
import { summarize } from "../../lib/pipeline-state";

/**
 * tmux status bar along the bottom: the session, one "window" per section
 * (the one you're reading is marked `*` and aria-current), and the live
 * `make deploy` status. It is the page's navigation.
 */
export function StatusBar() {
  const { states } = usePipeline();
  const { label, state } = summarize(STAGES, states);
  const windows = useRef<HTMLUListElement>(null);
  const current = STAGES.find((s) => states[s.id] === "running")?.id;

  // On narrow screens the window list scrolls sideways: keep the current one in view.
  useEffect(() => {
    const list = windows.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !link) return;
    const left = link.offsetLeft - list.offsetLeft;
    if (left < list.scrollLeft || left + link.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: left - 8, behavior: "smooth" });
    }
  }, [current]);

  const dot = state === "passed" ? "bg-ok" : state === "running" ? "bg-warn pulse-dot" : "bg-fg-subtle";

  return (
    <nav aria-label="Sections" className="fixed inset-x-0 bottom-0 z-40 flex h-8 items-stretch border-t border-line bg-surface-2 text-xs">
      <span aria-hidden="true" className="flex shrink-0 items-center bg-ok px-2.5 font-bold text-bg">
        [<span className="max-sm:hidden">portfolio</span>
        <span className="sm:hidden">0</span>]
      </span>
      <ul ref={windows} className="flex min-w-0 flex-1 items-stretch overflow-x-auto [scrollbar-width:none]">
        {STAGES.map((stage, i) => {
          const isCurrent = stage.id === current;
          return (
            <li key={stage.id} className="flex">
              <a
                href={`#${stage.id}`}
                aria-current={isCurrent ? "location" : undefined}
                className="flex items-center whitespace-nowrap px-2.5 text-fg-muted transition-colors hover:bg-surface hover:text-fg aria-[current]:bg-surface aria-[current]:text-ok"
              >
                <span aria-hidden="true">{i}:</span>
                {stage.window === "~" ? (
                  <>
                    <span aria-hidden="true">~</span>
                    <span className="sr-only">Top</span>
                  </>
                ) : (
                  stage.window
                )}
                <span aria-hidden="true">{isCurrent ? "*" : " "}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="flex shrink-0 items-center gap-2 border-l border-line px-3 text-fg-muted" data-testid="pipeline-status">
        <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <span>
          <span className="max-sm:hidden">make deploy · </span>
          {label}
        </span>
      </p>
    </nav>
  );
}
