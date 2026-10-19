/**
 * The site's pipeline, run by the companion's Deploy tab. It lists the real jobs in
 * .github/workflows/ci.yml, in order (data.test.ts checks it).
 */

/** The command that ships this site, then its real CI stages. */
export const PIPELINE = {
  command: "git push origin main",
  stages: ["lint", "typecheck", "unit tests", "build", "e2e (playwright + axe)", "lighthouse ci", "deploy to vercel"],
} as const;

