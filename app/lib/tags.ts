import type { StackGroup, StackItem } from "../data/types";

/** Names too generic to detect from free text (they'd match everywhere). */
const SKIP = new Set(["SQL", "Git", "Python scripting", "Windows", "REST APIs"]);

/** Escapes a name for a whole-word, case-sensitive regex ("C# / .NET" → matches "C#" or ".NET"). */
function patternsFor(item: StackItem): RegExp[] {
  const parts = item.name.includes(" / ") ? item.name.split(" / ") : [item.name.replace(/\s*\(.*\)$/, "")];
  return parts.map((part) => new RegExp(`(^|[^\\w.#])${part.trim().replace(/[.*+?^${}()|[\]\\#]/g, "\\$&")}(?![\\w#])`));
}

/**
 * Technologies from the stack that a piece of text actually mentions, in stack
 * order — so experience cards get tags (with logos) derived from their own
 * highlights instead of a hand-kept list that could drift.
 */
export function techMentioned(texts: readonly string[], stack: readonly StackGroup[]): StackItem[] {
  const text = texts.join(" \n ");
  const found: StackItem[] = [];
  for (const group of stack) {
    for (const item of group.items) {
      if (SKIP.has(item.name) || found.some((f) => f.name === item.name)) continue;
      if (patternsFor(item).some((re) => re.test(text))) found.push(item);
    }
  }
  return found;
}

/** Looks up a technology by display name (case-insensitive) to reuse its logo. */
export function findTech(name: string, stack: readonly StackGroup[]): StackItem | undefined {
  const target = name.toLowerCase();
  for (const group of stack) {
    const hit = group.items.find((item) => item.name.toLowerCase() === target || item.name.toLowerCase().split(" / ").includes(target));
    if (hit) return hit;
  }
  return undefined;
}
