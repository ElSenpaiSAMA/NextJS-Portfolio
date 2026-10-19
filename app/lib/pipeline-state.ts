/**
 * Which stages are pending, running or passed, from where each section sits
 * relative to a "reading line" in the viewport. Pure (rects in, states out)
 * so the rules are unit-tested; lib/pipeline-progress.ts feeds it from the DOM.
 */

export type StageState = "pending" | "running" | "passed";

export interface StageRect {
  id: string;
  top: number;
  bottom: number;
}

/**
 * - A stage is **running** while the reading line is inside it, **passed**
 *   once its bottom is above the line, **pending** before that.
 * - At the very end of the page every stage has passed (the last one can't
 *   scroll past the line).
 */
export function stageStates(rects: StageRect[], line: number, atEnd: boolean): Record<string, StageState> {
  const states: Record<string, StageState> = {};
  for (const r of rects) {
    if (atEnd || r.bottom <= line) states[r.id] = "passed";
    else if (r.top <= line) states[r.id] = "running";
    else states[r.id] = "pending";
  }
  return states;
}

/** Header summary: "running 3/6 · build", "passed 6/6", or "queued". */
export function summarize(order: { id: string; step: string }[], states: Record<string, StageState>): { label: string; done: number; total: number; state: StageState | "queued" } {
  const total = order.length;
  const done = order.filter((s) => states[s.id] === "passed").length;
  const running = order.find((s) => states[s.id] === "running");
  if (done === total) return { label: `passed ${done}/${total}`, done, total, state: "passed" };
  if (running) return { label: `running ${done + 1}/${total} · ${running.step}`, done, total, state: "running" };
  return { label: "queued", done, total, state: "queued" };
}
