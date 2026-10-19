import { profile } from "../../data/profile";
import { NAV_ITEMS } from "../../lib/site";
import { PipelineBadge } from "../pipeline/PipelineBadge";

/** Repo-style name, the live pipeline badge, the stage links and the CV. */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
        <a href="#top" className="shrink-0 font-mono text-sm">
          <span className="text-fg-subtle">~/</span>
          <span className="font-semibold">matias-speroni</span>
          <span className="sr-only"> — back to top</span>
        </a>
        <PipelineBadge />
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1 font-mono text-xs">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="rounded-md px-2.5 py-1.5 text-fg-muted transition-colors hover:bg-surface hover:text-fg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {profile.cvUrl && (
          <a href={profile.cvUrl} download className="hidden shrink-0 rounded-full bg-fg px-3.5 py-1.5 text-xs font-semibold text-bg hover:opacity-90 sm:block">
            CV
          </a>
        )}
      </div>
    </header>
  );
}
