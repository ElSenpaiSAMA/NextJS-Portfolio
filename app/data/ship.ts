/**
 * Copy for the "Ship it." framing. The pipeline lists the real jobs in
 * .github/workflows/ci.yml, in order (data.test.ts checks it).
 */

/** The command that ships this site, then its real CI stages. */
export const PIPELINE = {
  command: "git push origin main",
  stages: ["lint", "typecheck", "unit tests", "build", "e2e (playwright + axe)", "lighthouse ci", "deploy to vercel"],
} as const;

/** Small label above each section title: what that section is in a developer's world. */
export const SECTION_LABELS = {
  config: "portfolio.config.ts",
  projects: "Deployments",
  experience: "CHANGELOG.md",
  stack: "node_modules",
  about: "README.md",
  contact: "Issues",
} as const;
