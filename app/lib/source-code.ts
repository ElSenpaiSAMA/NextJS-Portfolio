import type { Profile, StackGroup } from "../data/types";

/**
 * Builds the `src/engineer.ts` file shown in the Source section from the real
 * content (profile + stack), as syntax-highlighted tokens. Generated, never
 * hand-written, so the code on screen can't drift from the CV data.
 */

export type TokenKind = "keyword" | "type" | "prop" | "string" | "number" | "punct" | "comment" | "fn" | "plain";

export interface Token {
  kind: TokenKind;
  text: string;
}

export type CodeLine = Token[];

const t = (kind: TokenKind, text: string): Token => ({ kind, text });
const str = (value: string) => t("string", JSON.stringify(value));

/** Turns a stack group title into a camelCase key: "CI/CD & Automation" → "ciCdAutomation". */
export function toKey(title: string): string {
  const words = title
    .replace(/[^A-Za-z0-9 ]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
  return words.map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1))).join("");
}

export function buildProfileSource(profile: Profile, stack: StackGroup[]): CodeLine[] {
  const indent = (n: number) => t("plain", "  ".repeat(n));
  const lines: CodeLine[] = [
    [t("comment", "// src/engineer.ts — generated from the same data as the rest of this page")],
    [t("keyword", "export const "), t("plain", "engineer"), t("punct", ": "), t("type", "Engineer"), t("punct", " = {")],
    [indent(1), t("prop", "name"), t("punct", ": "), str(profile.name), t("punct", ",")],
    [indent(1), t("prop", "role"), t("punct", ": "), str(profile.role), t("punct", ",")],
    [indent(1), t("prop", "location"), t("punct", ": "), str(profile.location), t("punct", ",")],
    [indent(1), t("prop", "status"), t("punct", ": "), str(profile.availability.toLowerCase()), t("punct", ",")],
    [indent(1), t("prop", "stack"), t("punct", ": {")],
  ];
  for (const group of stack) {
    const items = group.items.map((item) => item.name);
    lines.push([indent(2), t("prop", toKey(group.title)), t("punct", ": ["), ...items.flatMap((name, i) => [str(name), ...(i < items.length - 1 ? [t("punct", ", ")] : [])]), t("punct", "],")]);
  }
  lines.push([indent(1), t("punct", "},")]);
  lines.push([indent(1), t("fn", "ship"), t("punct", "() {")]);
  lines.push([indent(2), t("keyword", "return "), t("fn", "pipeline"), t("punct", "("), str("lint → test → build → deploy"), t("punct", ");")]);
  lines.push([indent(1), t("punct", "},")]);
  lines.push([t("punct", "};")]);
  return lines;
}

/** Plain text of a line (tests, accessible fallbacks). */
export const lineText = (line: CodeLine) => line.map((token) => token.text).join("");
