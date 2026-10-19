/**
 * The visitor-editable `portfolio.config.ts`. Parsed with a strict, tiny
 * grammar (never eval): one `key: value` per line inside `export default { … }`.
 * Unknown keys and invalid values become editor "problems", like a type
 * checker would report them; valid keys still apply.
 */

export type Theme = "light" | "dark";
export type Font = "sans" | "mono";

export interface SiteConfig {
  accent: string;
  theme: Theme;
  radius: number;
  font: Font;
}

export const DEFAULT_CONFIG: SiteConfig = { accent: "#2f5bff", theme: "light", radius: 12, font: "sans" };

export interface Problem {
  line: number;
  message: string;
}

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
const KEYS = Object.keys(DEFAULT_CONFIG) as (keyof SiteConfig)[];

/** Turns the editor text into a config. Bad lines are reported, never thrown. */
export function parseConfig(text: string): { config: SiteConfig; problems: Problem[] } {
  const config: SiteConfig = { ...DEFAULT_CONFIG };
  const problems: Problem[] = [];
  const lines = text.split("\n");

  if (!/export\s+default\s*\{/.test(text)) problems.push({ line: 1, message: "Expected `export default { … }`." });

  lines.forEach((raw, i) => {
    const line = i + 1;
    const code = raw.replace(/\/\/.*$/, "").trim();
    if (!code || /^export\s+default\s*\{$/.test(code) || /^\};?$/.test(code)) return;

    const match = code.match(/^([A-Za-z_$][\w$]*)\s*:\s*(.+?),?$/);
    if (!match) {
      problems.push({ line, message: "Expected `key: value,`." });
      return;
    }
    const [, key, rawValue] = match;
    if (!KEYS.includes(key as keyof SiteConfig)) {
      problems.push({ line, message: `Unknown key '${key}'. Try: ${KEYS.join(", ")}.` });
      return;
    }

    const value = rawValue.trim();
    const str = value.match(/^(["'])(.*)\1$/)?.[2];
    switch (key as keyof SiteConfig) {
      case "accent":
        if (str !== undefined && HEX.test(str)) config.accent = str;
        else problems.push({ line, message: "accent must be a hex colour string, e.g. \"#2f5bff\"." });
        break;
      case "theme":
        if (str === "light" || str === "dark") config.theme = str;
        else problems.push({ line, message: "theme must be \"light\" or \"dark\"." });
        break;
      case "font":
        if (str === "sans" || str === "mono") config.font = str;
        else problems.push({ line, message: "font must be \"sans\" or \"mono\"." });
        break;
      case "radius": {
        const n = Number(value);
        if (Number.isInteger(n) && n >= 0 && n <= 32) config.radius = n;
        else problems.push({ line, message: "radius must be a whole number from 0 to 32." });
        break;
      }
    }
  });

  return { config, problems };
}

export function serializeConfig(config: SiteConfig): string {
  return [
    "// Edit me — the whole page follows.",
    "export default {",
    `  accent: "${config.accent}",`,
    `  theme: "${config.theme}", // "light" | "dark"`,
    `  radius: ${config.radius}, // 0–32`,
    `  font: "${config.font}", // "sans" | "mono"`,
    "};",
  ].join("\n");
}

/** CSS custom properties / data attributes the config maps to (applied on <html>). */
export function configToCss(config: SiteConfig): { vars: Record<string, string>; attrs: Record<string, string> } {
  return {
    vars: { "--accent": config.accent, "--r": `${config.radius}px` },
    attrs: { "data-theme": config.theme, "data-font": config.font },
  };
}

export type ConfigTokenKind = "keyword" | "key" | "string" | "number" | "comment" | "punct" | "plain";

/** Tiny highlighter for the editor overlay: one token list per line. */
export function highlightConfig(text: string): { kind: ConfigTokenKind; text: string }[][] {
  const pattern = /(\/\/.*$)|("[^"]*"?|'[^']*'?)|\b(export|default)\b|\b(\d+)\b|([A-Za-z_$][\w$]*)(?=\s*:)|([{}:,;])/g;
  return text.split("\n").map((line) => {
    const tokens: { kind: ConfigTokenKind; text: string }[] = [];
    let last = 0;
    for (const m of line.matchAll(pattern)) {
      if (m.index > last) tokens.push({ kind: "plain", text: line.slice(last, m.index) });
      const kind: ConfigTokenKind = m[1] ? "comment" : m[2] ? "string" : m[3] ? "keyword" : m[4] ? "number" : m[5] ? "key" : "punct";
      tokens.push({ kind, text: m[0] });
      last = m.index + m[0].length;
    }
    if (last < line.length) tokens.push({ kind: "plain", text: line.slice(last) });
    return tokens;
  });
}
