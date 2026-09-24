import Link from "next/link";
import { profile } from "../../data/profile";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      {/* Stacks on narrow screens so the four links never crowd the name. */}
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-serif text-lg tracking-tight">
          {profile.name}
        </Link>
        <nav aria-label="Main" className="flex items-center justify-between gap-6">
          <NavLinks />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
