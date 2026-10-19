/**
 * Copy for the "Source → Build" framing: the build screen, the hero tagline
 * and the build log. The pipeline lists the real jobs in
 * .github/workflows/ci.yml, in order (data.test.ts checks it).
 */

/** Build screen: the site's real modules, "compiled" one by one. */
export const BUILD_MODULES = ["app/data/profile.ts", "app/data/projects.ts", "app/data/experience.ts", "app/data/stack.ts", "app/page.tsx"] as const;

/** Shown over the real footage once the ASCII has compiled (desktop scroll). */
export const HERO_TAGLINE = "I ship the software and the pipelines behind it.";

/** The command that builds this site, then its real CI stages. */
export const PIPELINE = {
  command: "git push origin main",
  stages: ["lint", "typecheck", "unit tests", "build", "e2e (playwright + axe)", "lighthouse ci", "deploy to vercel"],
} as const;

/** Where each section "lives" in the source tree (decorative label above its title). */
export const SECTION_PATHS = {
  source: "src/engineer.ts",
  projects: "src/projects/",
  experience: "git log --graph",
  stack: "package.json",
  about: "README.md",
  contact: "src/contact.ts",
} as const;
