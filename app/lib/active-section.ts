"use client";

import { useSyncExternalStore } from "react";

/**
 * Which page section is in view, shared by the header pills and the companion
 * panel through one IntersectionObserver (started lazily by the first
 * subscriber). Sections opt in with `data-companion-section="<id>"`.
 */

let active = "top";
const listeners = new Set<() => void>();
let observer: IntersectionObserver | null = null;
const visible = new Map<string, number>();

function start() {
  if (observer || typeof IntersectionObserver === "undefined") return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).dataset.companionSection!;
        if (entry.isIntersecting) visible.set(id, entry.intersectionRatio);
        else visible.delete(id);
      }
      // The section whose top is highest among those crossing the reading line wins.
      const ids = [...document.querySelectorAll<HTMLElement>("[data-companion-section]")].map((el) => el.dataset.companionSection!);
      const next = ids.find((id) => visible.has(id)) ?? active;
      if (next !== active) {
        active = next;
        listeners.forEach((l) => l());
      }
    },
    // A band around 40% of the viewport height acts as the "reading line".
    { rootMargin: "-35% 0px -60% 0px", threshold: [0, 0.01] },
  );
  document.querySelectorAll("[data-companion-section]").forEach((el) => observer!.observe(el));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  start();
  return () => {
    listeners.delete(listener);
  };
}

/** The id of the section being read ("top" until the hero scrolls away). */
export function useActiveSection(): string {
  return useSyncExternalStore(
    subscribe,
    () => active,
    () => "top",
  );
}
