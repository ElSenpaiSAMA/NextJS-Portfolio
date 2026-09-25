import { profile } from "../../data/profile";
import { NAV_ITEMS } from "../../lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-30 focus:rounded focus:bg-bg focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-xs font-bold text-accent-fg">
            MS
          </span>
          {/* sr-only (not hidden) on mobile so the link keeps an accessible name */}
          <span className="sr-only sm:not-sr-only">{profile.name}</span>
        </a>
        <nav aria-label="Sections" className="flex items-center gap-1">
          <ul className="flex items-center">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="rounded-md px-2.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-fg sm:px-3"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
