/**
 * Site-wide configuration and build metadata. Values are read at build time
 * (the page is static), so the footer shows the commit that is deployed.
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

/**
 * Page sections, in order. The header nav and the tests read this list.
 * `hideOnNarrow` drops the link from the header on phones < 400px so Contact
 * always fits; the section itself is still on the page.
 */
export const NAV_ITEMS = [
  { id: "projects", label: "Projects", hideOnNarrow: false },
  { id: "experience", label: "Experience", hideOnNarrow: false },
  { id: "stack", label: "Stack", hideOnNarrow: true },
  { id: "about", label: "About", hideOnNarrow: false },
  { id: "contact", label: "Contact", hideOnNarrow: false },
] as const;

export type SectionId = (typeof NAV_ITEMS)[number]["id"];
