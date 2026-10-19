"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CONFIG_STORAGE_KEY } from "../../lib/config-init";
import { DEFAULT_CONFIG, configToCss, highlightConfig, parseConfig, serializeConfig, type SiteConfig } from "../../lib/site-config";

/** Applies a config to <html> (CSS variables + data attributes) and remembers it for this visitor. */
function apply(config: SiteConfig) {
  const root = document.documentElement;
  const { vars, attrs } = configToCss(config);
  for (const [name, value] of Object.entries(vars)) root.style.setProperty(name, value);
  for (const [name, value] of Object.entries(attrs)) root.setAttribute(name, value);
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch {
    /* Storage blocked (private mode): the change still applies for this visit. */
  }
}

const PRESETS: { label: string; change: (c: SiteConfig) => SiteConfig }[] = [
  { label: "Dark mode", change: (c) => ({ ...c, theme: c.theme === "dark" ? "light" : "dark" }) },
  { label: "Mono font", change: (c) => ({ ...c, font: c.font === "mono" ? "sans" : "mono" }) },
  { label: "Sharp corners", change: (c) => ({ ...c, radius: c.radius === 0 ? 12 : 0 }) },
  {
    label: "Random accent",
    change: (c) => {
      // Reds, blues, violets and magentas at 42% lightness: white button text stays readable
      // (yellows and greens at this lightness would not).
      const hues = [0, 10, 200, 215, 230, 245, 260, 275, 290, 305, 320, 335, 350];
      const hue = hues[Math.floor(Math.random() * hues.length)];
      const el = document.createElement("canvas").getContext("2d");
      if (!el) return c;
      el.fillStyle = `hsl(${hue} 85% 42%)`;
      return { ...c, accent: el.fillStyle };
    },
  },
];

/**
 * `portfolio.config.ts`, live: edit the values and the whole page follows —
 * accent colour, light/dark theme, corner radius, font. A textarea sits on
 * top of a highlighted <pre> (same metrics), the text is parsed strictly (no
 * eval) and problems are listed like an editor's Problems panel. Valid keys
 * apply even when another line has an error. Saved per visitor.
 */
export function ConfigEditor() {
  const [text, setText] = useState(() => serializeConfig(DEFAULT_CONFIG));
  const { config, problems } = useMemo(() => parseConfig(text), [text]);
  const pre = useRef<HTMLPreElement>(null);
  const loaded = useRef(false);

  // Restore what this visitor saved last time (validated again by the parser).
  // Read after hydration (the server always renders the defaults), in a frame callback.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
        if (saved) {
          const restored = parseConfig(serializeConfig({ ...DEFAULT_CONFIG, ...JSON.parse(saved) })).config;
          setText(serializeConfig(restored));
        }
      } catch {
        /* Corrupt or blocked storage: keep the defaults. */
      }
      loaded.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (loaded.current) apply(config);
  }, [config]);

  const lines = highlightConfig(text);

  return (
    <div className="overflow-hidden rounded-ui border border-line bg-surface shadow-[0_30px_80px_-40px_rgb(0_0_0/0.3)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="font-mono text-xs text-fg-muted">portfolio.config.ts</p>
        <button
          type="button"
          onClick={() => setText(serializeConfig(DEFAULT_CONFIG))}
          className="rounded-ui px-2 py-1 font-mono text-xs text-fg-muted hover:bg-surface-2 hover:text-fg"
        >
          Reset
        </button>
      </div>

      <div className="relative font-mono text-[13px] leading-6 sm:text-sm sm:leading-7">
        <pre ref={pre} aria-hidden="true" className="pointer-events-none overflow-hidden whitespace-pre p-4 sm:p-5">
          {lines.map((line, i) => (
            <span key={i} className="block min-h-[1lh]">
              {line.map((token, j) => (
                <span key={j} className={`tok-${token.kind}`}>
                  {token.text}
                </span>
              ))}
            </span>
          ))}
        </pre>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onScroll={(e) => {
            if (pre.current) pre.current.scrollTop = e.currentTarget.scrollTop;
          }}
          aria-label="portfolio.config.ts — edit the values to restyle the page"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          wrap="off"
          className="absolute inset-0 resize-none overflow-hidden bg-transparent p-4 text-transparent caret-[var(--fg)] outline-none selection:bg-accent/25 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:p-5"
        />
      </div>

      <div className="border-t border-line bg-surface-2 px-4 py-3" aria-live="polite">
        {problems.length === 0 ? (
          <p className="font-mono text-xs text-ok">✓ No problems — config applied.</p>
        ) : (
          <ul className="space-y-1 font-mono text-xs text-error">
            {problems.map((problem) => (
              <li key={`${problem.line}-${problem.message}`}>
                Line {problem.line}: {problem.message}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => setText(serializeConfig(preset.change(config)))}
            className="rounded-ui border border-line bg-surface px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
