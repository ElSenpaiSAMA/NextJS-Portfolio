import { profile } from "../../data/profile";
import { PROMPT } from "../../data/shell";

/**
 * The terminal window's title bar: home link, the window title, the CV and
 * the window controls (decorative). Navigation lives in the tmux status bar
 * at the bottom (components/terminal/StatusBar).
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-ok focus:px-4 focus:py-1.5 focus:text-bg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-11 max-w-5xl items-center justify-between gap-3 px-4 text-sm sm:px-8">
        <a href="#top" className="shrink-0">
          <span className="text-fg-subtle">~/</span>
          <span className="font-bold">matias-speroni</span>
          <span className="sr-only"> — back to top</span>
        </a>
        <p aria-hidden="true" className="truncate text-xs text-fg-subtle max-md:hidden">
          {PROMPT.user}@{PROMPT.host}: ~ — bash
        </p>
        <div className="flex shrink-0 items-center gap-4">
          {profile.cvUrl && (
            <a href={profile.cvUrl} download className="rounded-md border border-line px-3 py-1 text-xs font-bold hover:border-ok">
              CV
            </a>
          )}
          <span aria-hidden="true" className="flex gap-1.5 max-sm:hidden">
            <span className="h-3 w-3 rounded-full bg-surface-2 ring-1 ring-line" />
            <span className="h-3 w-3 rounded-full bg-surface-2 ring-1 ring-line" />
            <span className="h-3 w-3 rounded-full bg-error/80" />
          </span>
        </div>
      </div>
    </header>
  );
}
