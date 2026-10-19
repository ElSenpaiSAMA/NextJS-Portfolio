import { profile } from "../../data/profile";
import { NAV_ITEMS } from "../../lib/site";

/** Mono bar: the repo-style name on the left, sections (they scramble on hover) and the CV on the right. */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-normal">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 font-mono text-[13px] sm:px-8">
        <a href="#top" className="shrink-0 rounded-full bg-ink/70 px-3 py-1.5 text-fg backdrop-blur-md">
          <span className="text-accent">●</span> <span className="max-[479px]:hidden">matias</span>
          <span className="text-fg-subtle max-[479px]:hidden">/</span>
          <span className="max-[479px]:hidden">portfolio</span>
          <span className="sr-only">Matias Speroni, back to top</span>
        </a>
        <nav aria-label="Sections" className="flex min-w-0 items-center gap-1 rounded-full bg-ink/70 px-1.5 py-1 backdrop-blur-md">
          {/* Scrolls sideways on narrow phones instead of wrapping */}
          <ul className="flex min-w-0 items-center overflow-x-auto [scrollbar-width:none]">
            {NAV_ITEMS.map(({ id, label, hideOnNarrow }) => (
              <li key={id} className={hideOnNarrow ? "max-[399px]:hidden" : undefined}>
                <a
                  href={`#${id}`}
                  aria-label={label}
                  className="block whitespace-nowrap rounded-full px-2 py-1.5 text-fg-muted transition-colors hover:text-fg sm:px-3"
                >
                  <span aria-hidden="true" data-scramble-hover>
                    {label.toLowerCase()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {profile.cvUrl && (
            <a href={profile.cvUrl} download className="shrink-0 rounded-full bg-accent px-3 py-1.5 text-ink transition-colors hover:bg-fg">
              cv
              <span className="sr-only"> (download CV)</span>
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
