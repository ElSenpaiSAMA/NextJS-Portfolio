import { NAV_ITEMS } from "../../lib/site";

/** Floating header over the 3D hero: monogram left, section links right. */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-haze/5 bg-night/70 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-haze focus:px-4 focus:py-2 focus:text-night"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-8">
        <a href="#top" className="display shrink-0 text-3xl ink-sunset">
          <span aria-hidden="true">MS</span>
          <span className="sr-only">Matias Speroni</span>
        </a>
        <nav aria-label="Sections">
          {/* Scrolls sideways on narrow phones instead of wrapping */}
          <ul className="flex items-center overflow-x-auto [scrollbar-width:none]">
            {NAV_ITEMS.map(({ id, label, hideOnNarrow }) => (
              <li key={id} className={hideOnNarrow ? "max-[399px]:hidden" : undefined}>
                <a
                  href={`#${id}`}
                  className="block whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-medium text-haze transition-colors hover:text-sunset sm:px-3.5 sm:text-sm"
                >
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
