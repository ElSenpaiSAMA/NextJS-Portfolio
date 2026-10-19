"use client";

import { useSyncExternalStore } from "react";
import { stageStates, type StageState } from "./pipeline-state";

/**
 * Live pipeline state shared by the spine, the stage nodes and the header
 * badge: one passive scroll listener (rAF-throttled) measures the sections
 * marked `data-stage` and publishes a new snapshot only when something changed.
 */

export interface PipelineSnapshot {
  /** 0–1: how far the page has been read. */
  progress: number;
  states: Record<string, StageState>;
}

/** Fraction of the viewport height where the "reading line" sits. */
export const READING_LINE = 0.45;

const SERVER: PipelineSnapshot = { progress: 0, states: {} };
let snapshot: PipelineSnapshot = SERVER;
const listeners = new Set<() => void>();
let started = false;
let frame = 0;

function measure() {
  frame = 0;
  const doc = document.documentElement;
  const max = Math.max(1, doc.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / max));
  const rects = [...document.querySelectorAll<HTMLElement>("[data-stage]")].map((el) => {
    const r = el.getBoundingClientRect();
    return { id: el.dataset.stage!, top: r.top, bottom: r.bottom };
  });
  const states = stageStates(rects, window.innerHeight * READING_LINE, progress > 0.995);
  const changed =
    Math.abs(progress - snapshot.progress) > 0.001 || rects.some((r) => snapshot.states[r.id] !== states[r.id]);
  if (!changed) return;
  snapshot = { progress, states };
  listeners.forEach((l) => l());
}

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(measure);
};

function start() {
  if (started) return;
  started = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  start();
  return () => {
    listeners.delete(listener);
  };
}

export function usePipeline(): PipelineSnapshot {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => SERVER,
  );
}
