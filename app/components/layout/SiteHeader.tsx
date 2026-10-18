import { NAV_ITEMS } from "../../lib/site";

/** Terminal title bar: the shell prompt is the home link, sections are paths. */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-console/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-amber focus:px-4 focus:py-2 focus:text-console"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 font-mono text-sm sm:px-8">
        <a href="#top" className="shrink-0 font-medium text-fg">
          <span className="max-sm:hidden">
            <span className="text-green">matias</span>
            <span className="text-fg-subtle">@</span>
            <span>speroni</span>
            <span className="text-fg-subtle">:</span>
          </span>
          <span className="text-cyan">~</span>
          <span className="text-amber">$</span>
          <span className="sr-only"> Matias Speroni, back to top</span>
        </a>
        <nav aria-label="Sections">
          {/* Scrolls sideways on narrow phones instead of wrapping */}
          <ul className="flex items-center overflow-x-auto [scrollbar-width:none]">
            {NAV_ITEMS.map(({ id, label, hideOnNarrow }) => (
              <li key={id} className={hideOnNarrow ? "max-[399px]:hidden" : undefined}>
                <a
                  href={`#${id}`}
                  className="block whitespace-nowrap rounded px-1.5 py-2 text-[13px] text-fg-muted transition-colors hover:bg-panel hover:text-amber sm:px-3 sm:text-sm"
                >
                  <span aria-hidden="true" className="text-fg-subtle max-sm:hidden">
                    ./
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
