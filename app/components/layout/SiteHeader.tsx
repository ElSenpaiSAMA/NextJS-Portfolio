"use client";

import { profile } from "../../data/profile";
import { useActiveSection } from "../../lib/active-section";
import { NAV_ITEMS } from "../../lib/site";
import { MailIcon } from "../ui/icons";

/**
 * Monogram + name on the left, numbered section pills in the middle (the one
 * in view lights up), "Let's talk" on the right. On phones the pills scroll
 * sideways under the bar.
 */
export function SiteHeader() {
  const active = useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-fg font-mono text-sm font-bold tracking-tighter">
            MS
          </span>
          <span className="leading-tight max-[419px]:sr-only">
            <span className="block text-sm font-semibold tracking-tight">{profile.name}</span>
            <span aria-hidden="true" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
              Backend · DevOps
            </span>
          </span>
        </a>

        <nav aria-label="Sections" className="hidden min-w-0 lg:block">
          <ul className="flex items-center gap-1.5">
            {NAV_ITEMS.map(({ id, label }, i) => {
              const current = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={current ? "location" : undefined}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm transition-[border-color,box-shadow,color] ${
                      current ? "border-accent/70 text-fg shadow-[var(--glow)]" : "border-line text-fg-muted hover:border-fg-subtle hover:text-fg"
                    }`}
                  >
                    <span aria-hidden="true" className="rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {profile.cvUrl && (
            <a href={profile.cvUrl} download className="rounded-full border border-line px-3.5 py-2 font-mono text-xs text-fg-muted hover:border-fg-subtle hover:text-fg">
              CV.PDF
            </a>
          )}
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90">
            <MailIcon width={16} height={16} />
            Let&apos;s talk
          </a>
        </div>
      </div>

      {/* Phones and tablets: the same pills, scrolling sideways */}
      <nav aria-label="Jump to" className="border-t border-line/70 lg:hidden">
        <ul className="flex gap-1.5 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6">
          {NAV_ITEMS.map(({ id, label }, i) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs ${active === id ? "border-accent/70 text-fg" : "border-line text-fg-muted"}`}
              >
                <span aria-hidden="true" className="font-mono text-[10px] text-fg-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
