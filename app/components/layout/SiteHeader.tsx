import { profile } from "../../data/profile";
import { NAV_ITEMS } from "../../lib/site";

/** Dev-tool top bar: project name with a status dot, sections, and the CV. */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2.5 focus:z-50 focus:rounded-ui focus:bg-fg focus:px-4 focus:py-1.5 focus:text-bg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ok" />
          <span className="max-[459px]:hidden">{profile.name}</span>
          <span aria-hidden="true" className="min-[460px]:hidden">
            MS
          </span>
          <span className="sr-only min-[460px]:hidden">{profile.name}</span>
        </a>
        <nav aria-label="Sections" className="flex min-w-0 items-center gap-1">
          {/* Scrolls sideways on narrow phones instead of wrapping */}
          <ul className="flex min-w-0 items-center overflow-x-auto [scrollbar-width:none]">
            {NAV_ITEMS.map(({ id, label, hideOnNarrow }) => (
              <li key={id} className={hideOnNarrow ? "max-[399px]:hidden" : undefined}>
                <a href={`#${id}`} className="block whitespace-nowrap px-2 py-2 text-[13px] text-fg-muted transition-colors hover:text-fg sm:px-3">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          {profile.cvUrl && (
            <a href={profile.cvUrl} download className="shrink-0 rounded-ui bg-fg px-3 py-1.5 text-[13px] font-medium text-bg hover:opacity-85">
              CV
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
