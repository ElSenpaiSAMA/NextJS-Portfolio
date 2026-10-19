"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { SHELL_HINT } from "../../data/shell";
import { complete, runCommand, type LineKind, type OutLine, type ShellAction, type ShellContent } from "../../lib/shell";
import { Prompt } from "./Prompt";

interface Entry {
  id: number;
  input: string;
  lines: OutLine[];
}

const COLOR: Record<LineKind, string> = {
  out: "text-fg",
  ok: "text-ok",
  err: "text-error",
  muted: "text-fg-subtle",
  accent: "text-accent-text",
};

/** Follows an in-page link the way a click would, so smooth scrolling (Lenis) and the hash both apply. */
function follow(href: string, download = false) {
  const a = document.createElement("a");
  a.href = href;
  if (download) a.download = "";
  document.body.append(a);
  a.click();
  a.remove();
}

function perform(action: ShellAction) {
  if (action.type === "scroll") follow(`#${action.id}`);
  else if (action.type === "download") follow(action.url, true);
  else if (action.type === "open") window.open(action.url, "_blank", "noopener,noreferrer");
}

function Line({ line }: { line: OutLine }) {
  const className = `${COLOR[line.kind ?? "out"]} min-h-[1lh] whitespace-pre-wrap break-words`;
  if (!line.href) return <p className={className}>{line.text}</p>;
  const external = line.href.startsWith("http");
  return (
    <p className={className}>
      <a href={line.href} className="underline decoration-line underline-offset-4 hover:decoration-current" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {line.text}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    </p>
  );
}

/**
 * A shell you can actually type into. lib/shell.ts decides what each command
 * prints and does (jump to a section, open a project, download the CV); this
 * renders the scrollback and handles the keys: Enter, Tab (complete), ↑/↓
 * (history), Ctrl+L (clear). "/" anywhere on the page focuses it.
 */
export function Shell({ content }: { content: ShellContent }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const cursor = useRef<number | null>(null);
  const nextId = useRef(0);
  const input = useRef<HTMLInputElement>(null);
  const scrollback = useRef<HTMLDivElement>(null);

  // Keep the newest output in view.
  useEffect(() => {
    const el = scrollback.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  // "/" focuses the shell from anywhere (unless you're already typing somewhere).
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || target.closest("input, textarea, [contenteditable]")) return;
      e.preventDefault();
      input.current?.focus({ preventScroll: true });
      input.current?.scrollIntoView({ block: "center" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submit() {
    const line = value;
    const result = runCommand(line, content, history);
    setValue("");
    cursor.current = null;
    if (line.trim()) setHistory((h) => [...h, line.trim()]);
    if (result.action?.type === "clear") {
      setEntries([]);
      return;
    }
    setEntries((list) => [...list.slice(-40), { id: nextId.current++, input: line, lines: result.lines }]);
    if (result.action) perform(result.action);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab" && value) {
      const completed = complete(value, content);
      e.preventDefault();
      if (completed) setValue(completed);
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (history.length === 0) return;
      e.preventDefault();
      const up = e.key === "ArrowUp";
      const from = cursor.current ?? history.length;
      const to = Math.min(history.length, Math.max(0, from + (up ? -1 : 1)));
      cursor.current = to;
      setValue(history[to] ?? "");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  }

  return (
    <div className="card mt-10 p-4 focus-within:border-ok/60 sm:p-5" onClick={() => input.current?.focus({ preventScroll: true })} data-testid="shell">
      <p className="text-sm text-fg-subtle">
        <span aria-hidden="true"># </span>
        {SHELL_HINT}
        <span className="max-sm:hidden"> Press / to focus it from anywhere.</span>
      </p>
      <div ref={scrollback} role="log" aria-label="Shell output" aria-live="polite" data-lenis-prevent className="mt-3 max-h-[22rem] space-y-3 overflow-y-auto text-sm leading-relaxed">
        {entries.map((entry) => (
          <div key={entry.id}>
            <p className="whitespace-pre-wrap break-words">
              <Prompt />
              <span className="sr-only">$ </span>
              {entry.input}
            </p>
            {entry.lines.map((line, i) => (
              <Line key={i} line={line} />
            ))}
          </div>
        ))}
      </div>
      <form
        className="mt-1 flex items-center text-sm"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label htmlFor="shell-input" className="sr-only">
          Type a command (try help)
        </label>
        <Prompt />
        <input
          ref={input}
          id="shell-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder="help"
          className="min-w-0 flex-1 bg-transparent text-base text-fg caret-ok outline-none placeholder:text-fg-subtle focus-visible:outline-none sm:text-sm"
        />
      </form>
    </div>
  );
}
