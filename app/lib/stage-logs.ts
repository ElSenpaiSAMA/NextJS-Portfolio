import type { Stage } from "../data/pipeline";
import type { Certification, ExperienceItem, Profile, Project, StackGroup } from "../data/types";

/**
 * The log lines each pipeline stage prints when it starts running. Computed
 * from the real content (counts, names, dates) — nothing invented — so this
 * stays pure and unit-tested; the UI only types them out.
 */

export interface LogContent {
  profile: Profile;
  stack: StackGroup[];
  projects: Project[];
  experience: ExperienceItem[];
  certifications: Certification[];
}

export interface LogLine {
  text: string;
  kind: "cmd" | "out" | "ok";
}

const cmd = (text: string): LogLine => ({ text, kind: "cmd" });
const out = (text: string): LogLine => ({ text, kind: "out" });
const ok = (text: string): LogLine => ({ text, kind: "ok" });

export function stageLogs(c: LogContent): Record<Stage["id"], LogLine[]> {
  const technologies = c.stack.reduce((n, g) => n + g.items.length, 0);
  const shipped = c.projects.filter((p) => !p.inDevelopment).length;
  const roles = c.experience.reduce((n, e) => n + e.roles.length, 0);
  const earliest = c.experience[c.experience.length - 1].roles.at(-1)!.period.split(/\s+[–-]\s+/)[0];
  const repo = c.profile.githubUrl.replace(/^https:\/\//, "");

  return {
    top: [cmd(`git clone ${repo}`), out(`${c.profile.name} · ${c.profile.role}`), ok(`checked out · ${c.profile.location}`)],
    stack: [cmd("npm ci"), out(`${c.stack.length} groups, ${technologies} technologies`), ok(`resolved ${technologies} dependencies`)],
    projects: [cmd("npm run build"), out(`${c.projects.length} projects · ${shipped} shipped · ${c.projects.length - shipped} in development`), ok("build succeeded")],
    experience: [
      cmd("npm test -- --env=production"),
      out(`${c.experience.length} companies · ${roles} roles · since ${earliest}`),
      out(`${c.certifications.length} certifications verified`),
      ok("all checks passed"),
    ],
    about: [cmd("git tag --annotate"), out(`${c.profile.facts.length} facts · ${c.profile.about.length} paragraphs`), ok("release notes published")],
    contact: [cmd("deploy --to your-team"), out(c.profile.availability.toLowerCase()), ok("waiting for approval")],
  };
}
