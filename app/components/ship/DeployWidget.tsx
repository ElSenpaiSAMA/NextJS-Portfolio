"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DeployStep } from "../../lib/deploy";
import { MOTION_QUERY, useMediaQuery } from "../../lib/motion";

type Status = "pending" | "running" | "passed";
type Run = "idle" | "running" | "done";

interface LogLine {
  id: number;
  text: string;
  kind: "cmd" | "out" | "ok";
}

function StatusIcon({ status }: { status: Status }) {
  if (status === "passed")
    return (
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 text-ok">
        <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.15" />
        <path d="m5 8.2 2 2 4-4.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (status === "running")
    return (
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 animate-spin text-warn motion-reduce:animate-none">
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="26 12" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 text-fg-subtle">
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
    </svg>
  );
}

/**
 * Press "Deploy" and watch this site ship: its real CI stages run one by one,
 * the log streams lines computed from the real content, and the run ends with
 * the time it actually took. Runs once on its own after the welcome screen;
 * with reduced motion it shows the finished run straight away.
 */
export function DeployWidget({ steps, command }: { steps: DeployStep[]; command: string }) {
  const motion = useMediaQuery(MOTION_QUERY);
  const [run, setRun] = useState<Run>("idle");
  const [statuses, setStatuses] = useState<Status[]>(() => steps.map(() => "pending"));
  const [log, setLog] = useState<LogLine[]>([]);
  const [seconds, setSeconds] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const logBox = useRef<HTMLOListElement>(null);
  const ids = useRef(0);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const finishedLog = useCallback((): LogLine[] => {
    const lines: LogLine[] = [{ id: ids.current++, text: `$ ${command}`, kind: "cmd" }];
    for (const step of steps) {
      lines.push({ id: ids.current++, text: `▸ ${step.log[0]}`, kind: "out" });
      for (const out of step.log.slice(1)) lines.push({ id: ids.current++, text: `  ${out}`, kind: "out" });
      lines.push({ id: ids.current++, text: `✓ ${step.stage}`, kind: "ok" });
    }
    return lines;
  }, [command, steps]);

  const deploy = useCallback(() => {
    clear();
    if (!motion) {
      setStatuses(steps.map(() => "passed"));
      setLog(finishedLog());
      setSeconds(null);
      setRun("done");
      return;
    }
    const started = performance.now();
    setRun("running");
    setSeconds(null);
    setStatuses(steps.map(() => "pending"));
    setLog([{ id: ids.current++, text: `$ ${command}`, kind: "cmd" }]);
    const push = (text: string, kind: LogLine["kind"]) => setLog((l) => [...l, { id: ids.current++, text, kind }]);

    let at = 250;
    steps.forEach((step, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setStatuses((s) => s.map((v, j) => (j === i ? "running" : v)));
          push(`▸ ${step.log[0]}`, "out");
        }, at),
      );
      step.log.slice(1).forEach((out, k) => {
        timers.current.push(window.setTimeout(() => push(`  ${out}`, "out"), at + ((k + 1) * step.ms) / (step.log.length + 1)));
      });
      at += step.ms;
      timers.current.push(
        window.setTimeout(() => {
          setStatuses((s) => s.map((v, j) => (j === i ? "passed" : v)));
          push(`✓ ${step.stage}`, "ok");
        }, at),
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setSeconds((performance.now() - started) / 1000);
        setRun("done");
      }, at + 150),
    );
  }, [command, finishedLog, motion, steps]);

  // First run on its own: after the welcome screen on a first visit, sooner on reloads.
  useEffect(() => {
    const introPlaying = document.documentElement.dataset.intro !== "seen";
    const t = window.setTimeout(deploy, motion ? (introPlaying ? 3600 : 700) : 0);
    return () => {
      window.clearTimeout(t);
      clear();
    };
  }, [deploy, motion]);

  // Keep the newest log line in view.
  useEffect(() => {
    const box = logBox.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [log]);

  const passed = statuses.filter((s) => s === "passed").length;

  return (
    <div className="overflow-hidden rounded-ui border border-line bg-surface shadow-[0_30px_80px_-40px_rgb(0_0_0/0.35)]" data-testid="deploy">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="flex items-center gap-2 font-mono text-xs text-fg-muted">
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full ${run === "done" ? "bg-ok" : run === "running" ? "pulse-dot bg-warn" : "bg-fg-subtle"}`}
          />
          production
        </p>
        <button
          type="button"
          onClick={deploy}
          disabled={run === "running"}
          className="rounded-ui bg-accent px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {run === "running" ? "Deploying…" : run === "done" ? "Redeploy" : "Deploy"}
        </button>
      </div>

      <ol aria-label="Pipeline" className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-b border-line p-4 text-sm sm:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.stage} className={`flex items-center gap-2 transition-colors ${statuses[i] === "pending" ? "text-fg-subtle" : "text-fg"}`}>
            <StatusIcon status={statuses[i]} />
            <span className="truncate">{step.stage}</span>
          </li>
        ))}
      </ol>

      <div aria-hidden="true" className="h-1 bg-surface-2">
        <div className="h-full bg-accent transition-[width] duration-300 ease-out" style={{ width: `${(passed / steps.length) * 100}%` }} />
      </div>

      <ol ref={logBox} aria-hidden="true" className="h-44 overflow-y-auto bg-surface-2 p-4 font-mono text-[12px] leading-relaxed sm:h-52">
        {log.map((line) => (
          <li key={line.id} className={line.kind === "cmd" ? "text-fg" : line.kind === "ok" ? "text-ok" : "whitespace-pre text-fg-muted"}>
            {line.text}
          </li>
        ))}
        {run === "idle" && <li className="text-fg-subtle">Waiting for a deploy…</li>}
      </ol>

      <p role="status" className="min-h-11 px-4 py-3 text-sm font-medium">
        {run === "done" ? (
          <span className="text-ok">{seconds ? `Deployed to production in ${seconds.toFixed(1)} s.` : "Deployed to production."}</span>
        ) : run === "running" ? (
          <span className="text-fg-muted">
            Running {passed + 1} of {steps.length}…
          </span>
        ) : (
          <span className="text-fg-muted">Press Deploy to ship this site.</span>
        )}
      </p>
    </div>
  );
}
