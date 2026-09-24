import { NAV_ITEMS } from "../../lib/site";
import { profile } from "../../data/profile";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5">
        <a href="#top" className="font-mono text-sm font-medium">
          {profile.name.toLowerCase().replace(" ", ".")}
        </a>
        <nav aria-label="Sections" className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="rounded px-2.5 py-1.5 text-sm text-muted hover:text-fg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          {/* Mobile keeps the single most important action visible */}
          <a href="#contact" className="rounded px-2.5 py-1.5 text-sm text-muted hover:text-fg md:hidden">
            Contact
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
