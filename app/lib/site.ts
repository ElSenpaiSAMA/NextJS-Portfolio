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
 * Numbered page sections, in order (the header shows them as 01–05 pills and
 * highlights the one in view). Contact is the separate "Let's talk" call to
 * action. The tests read this list.
 */
export const NAV_ITEMS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "certifications", label: "Certifications" },
  { id: "about", label: "About" },
] as const;

export type SectionId = (typeof NAV_ITEMS)[number]["id"] | "top" | "contact";
