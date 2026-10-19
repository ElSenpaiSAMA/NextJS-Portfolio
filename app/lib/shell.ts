import type { Stage } from "../data/pipeline";
import { PROMPT, SHELL_COMMANDS } from "../data/shell";
import type { Certification, EducationItem, ExperienceItem, Profile, Project, StackGroup } from "../data/types";

/**
 * The interactive shell's brain: a line in, what to print (and what to do)
 * out. Pure — the content is passed in and every answer is built from it —
 * so the UI (components/terminal/Shell) only renders and runs the action.
 */

export interface ShellContent {
  profile: Profile;
  stack: StackGroup[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: Certification[];
  stages: Stage[];
}

export type LineKind = "out" | "ok" | "err" | "muted" | "accent";

export interface OutLine {
  text: string;
  kind?: LineKind;
  /** Renders the line as a link (external when it starts with http). */
  href?: string;
}

export type ShellAction =
  | { type: "scroll"; id: Stage["id"] }
  | { type: "open"; url: string }
  | { type: "download"; url: string }
  | { type: "clear" };

export interface ShellResult {
  lines: OutLine[];
  action?: ShellAction;
}

const out = (text: string, kind: LineKind = "out", href?: string): OutLine => (href ? { text, kind, href } : { text, kind });

/** Files and folders in ~ (folders end with "/"). */
const HOME = ["about.md", "contact.sh", "cv.pdf", "experience/", "projects/", "stack.yaml"];

/** `cd` targets → section ids. */
const SECTIONS: Record<string, Stage["id"]> = {
  "~": "top",
  stack: "stack",
  "stack.yaml": "stack",
  projects: "projects",
  experience: "experience",
  about: "about",
  "about.md": "about",
  contact: "contact",
  "contact.sh": "contact",
};

/** Normalises "./projects/", "~/projects", "/home/matias/projects" → "projects". */
function clean(path: string): string {
  return path
    .replace(new RegExp(`^${PROMPT.home}/?`), "")
    .replace(/^~\/?/, "")
    .replace(/^\.\//, "")
    .replace(/\/+$/, "");
}

/** Shortest "since" in the work history: the start of the oldest role. */
export function since(experience: ExperienceItem[]): string {
  return experience[experience.length - 1].roles.at(-1)!.period.split(/\s+[–-]\s+/)[0];
}

function aboutFile(c: ShellContent): OutLine[] {
  return [
    out(`# ${c.profile.name}`, "accent"),
    ...c.profile.about.flatMap((p) => [out(""), out(p)]),
    out(""),
    ...c.profile.facts.map((f) => out(`${f.label}: ${f.value}`, "muted")),
  ];
}

function stackFile(c: ShellContent): OutLine[] {
  return c.stack.flatMap((g) => [out(`${g.title}:`, "accent"), ...g.items.map((i) => out(`  - ${i.name}${i.detail ? `  # ${i.detail}` : ""}`))]);
}

function projectFile(p: Project): OutLine[] {
  return [
    out(`# ${p.title}${p.inDevelopment ? "  (in development)" : ""}`, "accent"),
    out(p.description),
    out(`tech: ${p.tech.join(", ")}`, "muted"),
    ...(p.siteLink ? [out(`live: ${p.siteLink}`, "ok", p.siteLink)] : []),
    ...(p.github ? [out(`code: ${p.github}`, "ok", p.github)] : []),
  ];
}

function contactLines(c: ShellContent): OutLine[] {
  return [
    out(c.profile.availability, "ok"),
    out(`email     ${c.profile.email}`, "out", `mailto:${c.profile.email}`),
    out(`phone     ${c.profile.phone}`, "out", `tel:${c.profile.phoneHref}`),
    out(`linkedin  ${c.profile.linkedinUrl.replace(/^https:\/\/(www\.)?/, "")}`, "out", c.profile.linkedinUrl),
    out(`github    ${c.profile.githubUrl.replace(/^https:\/\//, "")}`, "out", c.profile.githubUrl),
  ];
}

function gitLog(c: ShellContent): OutLine[] {
  return c.experience.flatMap((e, i) => [
    out(`* ${e.company}${i === 0 ? "  (HEAD)" : ""}`, "accent"),
    ...e.roles.map((r) => out(`  ${r.period}  ${r.title}`)),
    ...(i < c.experience.length - 1 ? [out("|", "muted")] : []),
  ]);
}

function neofetch(c: ShellContent): OutLine[] {
  const technologies = c.stack.reduce((n, g) => n + g.items.length, 0);
  return [
    out(`${PROMPT.user}@${PROMPT.host}`, "accent"),
    out(`name      ${c.profile.name}`),
    out(`role      ${c.profile.role}`),
    out(`location  ${c.profile.location}`),
    out(`uptime    in production since ${since(c.experience)}`),
    out(`packages  ${technologies} technologies`),
    out(`status    ${c.profile.availability}`, "ok"),
  ];
}

function findProject(c: ShellContent, arg: string): Project | undefined {
  const name = clean(arg).replace(/^projects\//, "").replace(/\/README\.md$/i, "").toLowerCase();
  return c.projects.find((p) => p.slug === name || p.title.toLowerCase() === name);
}

/** Runs one line typed at the prompt. */
export function runCommand(input: string, c: ShellContent, history: readonly string[] = []): ShellResult {
  const line = input.trim();
  if (!line) return { lines: [] };
  const [name, ...args] = line.split(/\s+/);
  const arg = args.join(" ");
  const cmd = name.toLowerCase();

  switch (cmd) {
    case "help":
    case "man":
      return {
        lines: [
          out("Commands:", "accent"),
          ...SHELL_COMMANDS.map((s) => out(`  ${s.usage.padEnd(16)}${s.does}`)),
          out("Tab completes, ↑/↓ walks the history.", "muted"),
        ],
      };

    case "ls": {
      const target = clean(arg.replace(/^-\w+\s*/, ""));
      if (!target) return { lines: [out(HOME.join("  "))] };
      if (target === "projects") return { lines: [out(c.projects.map((p) => `${p.slug}/`).join("  "))] };
      if (target === "experience") return { lines: [out(c.experience.map((e) => e.company.toLowerCase().replace(/\s+/g, "-")).join("  "))] };
      if (HOME.includes(target)) return { lines: [out(target)] };
      return { lines: [out(`ls: cannot access '${arg}': No such file or directory`, "err")] };
    }

    case "cat":
    case "less":
    case "more": {
      const target = clean(arg);
      if (!target) return { lines: [out(`${cmd}: missing file operand. Try 'cat about.md'.`, "err")] };
      if (target === "about.md") return { lines: aboutFile(c) };
      if (target === "stack.yaml") return { lines: stackFile(c) };
      if (target === "contact.sh") return { lines: contactLines(c) };
      if (target === "cv.pdf") return { lines: [out("cv.pdf is a binary file. Run 'cv' to download it.", "muted")] };
      if (target === "projects" || target === "experience") return { lines: [out(`${cmd}: ${arg}: Is a directory`, "err")] };
      const project = findProject(c, target);
      if (project) return { lines: projectFile(project) };
      return { lines: [out(`${cmd}: ${arg}: No such file or directory`, "err")] };
    }

    case "cd": {
      const target = clean(arg);
      if (target === ".." || target === "/") return { lines: [out("You're already home. Everything is in ~.", "muted")] };
      const id = target ? SECTIONS[target] : "top";
      if (!id) {
        const project = findProject(c, target);
        if (project) return { lines: [out(`→ ${project.title}`, "muted")], action: { type: "scroll", id: "projects" } };
        return { lines: [out(`cd: no such file or directory: ${arg}`, "err")] };
      }
      return { lines: [out(`→ ${c.stages.find((s) => s.id === id)?.title ?? id}`, "muted")], action: { type: "scroll", id } };
    }

    case "open": {
      const project = arg ? findProject(c, arg) : undefined;
      const url = project?.siteLink ?? project?.github;
      if (!project || !url) return { lines: [out(`open: ${arg || "missing project"}. Try 'ls projects'.`, "err")] };
      return { lines: [out(`opening ${url}`, "muted")], action: { type: "open", url } };
    }

    case "whoami":
      return { lines: [out(`${c.profile.name} — ${c.profile.role}, ${c.profile.location}`)] };

    case "neofetch":
      return { lines: neofetch(c) };

    case "git":
      if (args[0] === "log") return { lines: gitLog(c) };
      return { lines: [out("git: only 'git log' is installed here.", "err")] };

    case "contact":
    case "./contact.sh":
      return { lines: contactLines(c) };

    case "make":
      if (args[0] === "deploy") {
        return {
          lines: [...c.stages.slice(0, -1).map((s) => out(`✓ ${s.step.padEnd(9)}${s.meaning}`, "ok")), out("● deploy   waiting for your approval", "accent")],
          action: { type: "scroll", id: "contact" },
        };
      }
      return { lines: [out(`make: *** No rule to make target '${arg || ""}'. Try 'make deploy'.`, "err")] };

    case "cv":
      if (!c.profile.cvUrl) return { lines: [out("cv: not available yet.", "err")] };
      return { lines: [out("downloading cv.pdf", "muted")], action: { type: "download", url: c.profile.cvUrl } };

    case "github":
      return { lines: [out(`opening ${c.profile.githubUrl}`, "muted")], action: { type: "open", url: c.profile.githubUrl } };

    case "linkedin":
      return { lines: [out(`opening ${c.profile.linkedinUrl}`, "muted")], action: { type: "open", url: c.profile.linkedinUrl } };

    case "history":
      return { lines: history.map((h, i) => out(`${String(i + 1).padStart(4)}  ${h}`)) };

    case "clear":
      return { lines: [], action: { type: "clear" } };

    case "pwd":
      return { lines: [out(PROMPT.home)] };

    case "echo":
      return { lines: [out(arg)] };

    case "sudo":
      return { lines: [out(`${PROMPT.user} is not in the sudoers file. This incident will be reported.`, "err")] };

    case "rm":
      return { lines: [out("rm: permission denied — this portfolio runs in production.", "err")] };

    case "exit":
    case "logout":
      return { lines: [out("There's no way out. Try 'make deploy' instead.", "muted")] };

    case "vim":
    case "vi":
    case "nano":
    case "emacs":
      return { lines: [out(`${cmd}: you'd never get out. Use 'cat' instead.`, "muted")] };

    default:
      return { lines: [out(`${name}: command not found. Type 'help'.`, "err")] };
  }
}

/** Every word Tab can complete to: commands, then files in ~ and projects/<slug>. */
function candidates(c: ShellContent, position: "command" | "argument"): string[] {
  if (position === "command") return SHELL_COMMANDS.map((s) => s.name);
  return [...HOME, ...c.projects.map((p) => `projects/${p.slug}`), "deploy", "log"];
}

/**
 * Tab completion for the last word: the completed line when exactly one
 * candidate matches, the longest shared prefix when several do, or null.
 */
export function complete(input: string, c: ShellContent): string | null {
  const parts = input.split(" ");
  const word = parts[parts.length - 1];
  const position = parts.length === 1 ? "command" : "argument";
  const matches = candidates(c, position).filter((w) => w.startsWith(word));
  if (matches.length === 0 || !word) return null;
  let prefix = matches[0];
  for (const m of matches) while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1);
  if (prefix === word && matches.length > 1) return null;
  parts[parts.length - 1] = matches.length === 1 ? matches[0] + (matches[0].endsWith("/") ? "" : " ") : prefix;
  return parts.join(" ");
}

/** A stable 7-character hex "commit hash" for a name (FNV-1a) — decoration for the git log, never a real commit. */
export function shortHash(text: string): string {
  let h = 0x811c9dc5;
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 0x01000193) >>> 0;
  return h.toString(16).padStart(8, "0").slice(0, 7);
}
