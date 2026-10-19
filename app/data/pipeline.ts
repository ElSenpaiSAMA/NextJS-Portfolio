/**
 * The page is a terminal session, and the session runs a pipeline: each
 * section is the output of one command, in order, and each command is a stage
 * of `make deploy` (checkout → deploy). The commands and step names are the
 * metaphor; the titles are what the section is about.
 */

export interface Stage {
  /** Section id on the page (anchor). */
  id: "top" | "stack" | "projects" | "experience" | "about" | "contact";
  /** The command typed at the prompt before the section's output. */
  command: string;
  /** tmux window name in the status bar. */
  window: string;
  /** Pipeline step name (status bar, `make deploy`). */
  step: string;
  /** Section title. */
  title: string;
  /** What this stage means here (printed by `make deploy`). */
  meaning: string;
}

export const STAGES: Stage[] = [
  { id: "top", command: "neofetch", window: "~", step: "checkout", title: "Matias Speroni", meaning: "pull who I am" },
  { id: "stack", command: "cat stack.yaml", window: "stack", step: "install", title: "Stack", meaning: "resolve the tools I work with" },
  { id: "projects", command: "ls -l ~/projects", window: "projects", step: "build", title: "Projects", meaning: "the artifacts I've built" },
  { id: "experience", command: 'git log --author="Matias Speroni"', window: "experience", step: "test", title: "Experience", meaning: "tested in production" },
  { id: "about", command: "cat about.md", window: "about", step: "release", title: "About", meaning: "release notes on the person" },
  { id: "contact", command: "make deploy", window: "contact", step: "deploy", title: "Let's work together", meaning: "deploy me to your team" },
];
