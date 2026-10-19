import type { SectionId } from "../lib/site";

/**
 * Copy for the "Ops console" framing: the boot screen, the hero terminal
 * and the command shown above each section title. The pipeline lists the
 * real jobs in .github/workflows/ci.yml, in order, so keep them in sync.
 */

/** Boot screen lines, systemd style. */
export const BOOT_LINES = [
  "Mounted /projects",
  "Loaded stack.yml",
  "Reached target experience.target",
  "Started contact.service",
  "Started portfolio.service",
] as const;

/** The command that pushes this site, then its real CI stages. */
export const PIPELINE = {
  command: "git push origin main",
  stages: ["lint", "typecheck", "unit tests", "build", "e2e (playwright + axe)", "lighthouse ci", "deploy to vercel"],
} as const;

/** Shown mid-scroll over the data-center footage while the hero is pinned (desktop). */
export const HERO_TAGLINE = "I ship the software and the pipelines behind it";

/** Shell command printed above each section title (decorative, aria-hidden). */
export const SECTION_COMMANDS: Record<SectionId, string> = {
  projects: "ls ~/projects",
  experience: "git log --graph --career",
  stack: "cat stack.yml",
  about: "cat README.md",
  contact: "./contact.sh",
};
