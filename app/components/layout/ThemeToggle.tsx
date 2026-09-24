"use client";

import { applyTheme, readTheme } from "../../lib/theme";
import { MoonIcon, SunIcon } from "../ui/icons";

/**
 * Stateless on purpose: the current theme lives on <html data-theme>, set
 * before hydration, and CSS picks the icon — so server and client markup are
 * identical (no hydration mismatch, no flash).
 */
export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={() => applyTheme(readTheme() === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      data-testid="theme-toggle"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted hover:border-accent hover:text-fg"
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}
