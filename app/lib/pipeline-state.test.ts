import { describe, expect, it } from "vitest";
import { stageStates, summarize } from "./pipeline-state";

const rects = [
  { id: "a", top: -900, bottom: -100 },
  { id: "b", top: -100, bottom: 600 },
  { id: "c", top: 600, bottom: 1400 },
];
const order = [
  { id: "a", step: "checkout" },
  { id: "b", step: "install" },
  { id: "c", step: "build" },
];

describe("stageStates", () => {
  it("passes what's above the line, runs what contains it, queues the rest", () => {
    expect(stageStates(rects, 400, false)).toEqual({ a: "passed", b: "running", c: "pending" });
  });

  it("passes everything at the end of the page", () => {
    expect(stageStates(rects, 400, true)).toEqual({ a: "passed", b: "passed", c: "passed" });
  });
});

describe("summarize", () => {
  it("reports the running stage, a full pass, or a queue", () => {
    expect(summarize(order, { a: "passed", b: "running", c: "pending" })).toMatchObject({ label: "running 2/3 · install", state: "running" });
    expect(summarize(order, { a: "passed", b: "passed", c: "passed" })).toMatchObject({ label: "passed 3/3", state: "passed" });
    expect(summarize(order, { a: "pending", b: "pending", c: "pending" })).toMatchObject({ label: "queued", done: 0 });
  });
});
