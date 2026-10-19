import { profile } from "../../data/profile";
import { NAV_ITEMS } from "../../lib/site";

/** Apple-style bar: thin, translucent, the name on the left, sections and the CV pill on the right. */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[rgb(22_22_23/0.82)] backdrop-blur-xl backdrop-saturate-150">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-1.5 focus:text-black"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-12 max-w-[980px] items-center justify-between gap-3 px-4 sm:px-8">
        <a href="#top" className="shrink-0 text-[15px] font-semibold tracking-tight text-white sm:text-[17px]">
          <span className="max-[479px]:hidden">{profile.name}</span>
          <span className="min-[480px]:hidden" aria-hidden="true">
            MS
          </span>
          <span className="sr-only min-[480px]:hidden">{profile.name}</span>
        </a>
        <nav aria-label="Sections" className="flex items-center gap-1 sm:gap-2">
          {/* Scrolls sideways on narrow phones instead of wrapping */}
          <ul className="flex items-center overflow-x-auto [scrollbar-width:none]">
            {NAV_ITEMS.map(({ id, label, hideOnNarrow }) => (
              <li key={id} className={hideOnNarrow ? "max-[399px]:hidden" : undefined}>
                <a
                  href={`#${id}`}
                  className="block whitespace-nowrap px-1.5 py-2 text-xs text-white/80 transition-colors hover:text-white sm:px-2.5"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          {profile.cvUrl && (
            <a href={profile.cvUrl} download className="shrink-0 rounded-full bg-blue px-3 py-1 text-xs text-white hover:bg-[#0077ed]">
              CV
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
