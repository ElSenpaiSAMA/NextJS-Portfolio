import type { ExperienceItem, Project, StackGroup } from "../data/types";

/**
 * The hero's "Deploy" run: the site's real CI stages, each with log lines
 * computed from the real content (counts, names) — nothing invented. Pure, so
 * the script is unit-tested; the widget only plays it.
 */

export interface DeployStep {
  stage: string;
  /** Milliseconds this step "runs" in the animation. */
  ms: number;
  log: string[];
}

export function buildDeployScript(
  stages: readonly string[],
  content: { projects: Project[]; stack: StackGroup[]; experience: ExperienceItem[] },
): DeployStep[] {
  const technologies = content.stack.reduce((n, g) => n + g.items.length, 0);
  const roles = content.experience.reduce((n, e) => n + e.roles.length, 0);
  const logFor: Record<string, string[]> = {
    lint: ["eslint .", "0 problems"],
    typecheck: ["tsc --noEmit", "no type errors"],
    "unit tests": ["vitest run", "content integrity: profile, projects, stack"],
    build: [
      "next build",
      `${content.projects.length} projects, ${content.stack.length} stack groups (${technologies} technologies)`,
      `${content.experience.length} companies, ${roles} roles`,
    ],
    "e2e (playwright + axe)": ["playwright test", "desktop + mobile, WCAG 2.1 AA"],
    "lighthouse ci": ["lhci autorun", "budgets checked"],
    "deploy to vercel": ["vercel deploy --prod", "assigned to production"],
  };
  return stages.map((stage, i) => ({ stage, ms: 380 + ((i * 137) % 260), log: logFor[stage] ?? [stage] }));
}

/** Total length of a run, for the progress bar. */
export const scriptDuration = (steps: DeployStep[]) => steps.reduce((t, s) => t + s.ms, 0);
