/**
 * Site-wide configuration and build metadata. Values are read at build time
 * (pages are static), so the footer shows the commit that is deployed.
 */

const DEFAULT_SITE_URL = "https://matias-nicolas-speroni.vercel.app";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

export interface BuildInfo {
  /** Short commit SHA, or null for local builds. */
  commit: string | null;
  commitUrl: string | null;
  /** "production" | "preview" | "development" (Vercel) or "local". */
  environment: string;
}

export function getBuildInfo(repoUrl: string): BuildInfo {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? null;
  return {
    commit: sha ? sha.slice(0, 7) : null,
    commitUrl: sha ? `${repoUrl}/commit/${sha}` : null,
    environment: process.env.VERCEL_ENV ?? "local",
  };
}

/** Top-level pages, in navigation order. Sitemap and E2E tests read this too. */
export const NAV_ITEMS = [
  { href: "/projects", label: "Work" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavHref = (typeof NAV_ITEMS)[number]["href"];

export function projectHref(slug: string): string {
  return `/projects/${slug}`;
}

/** Nav item is active on its own page and on any nested page (/projects/x). */
export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
