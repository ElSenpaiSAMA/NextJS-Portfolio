/**
 * The page as a CI/CD pipeline: each section is a stage, in run order. The
 * stage names are the metaphor (what that part of the page does for a
 * reader), the titles are what the section is about.
 */

export interface Stage {
  /** Section id on the page (anchor). */
  id: "top" | "stack" | "projects" | "experience" | "about" | "contact";
  /** Pipeline step name shown on the node. */
  step: string;
  /** Section title. */
  title: string;
  /** One line under the step name: what this stage means here. */
  meaning: string;
}

export const STAGES: Stage[] = [
  { id: "top", step: "checkout", title: "Matias Speroni", meaning: "pull who I am" },
  { id: "stack", step: "install", title: "Stack", meaning: "resolve the tools I work with" },
  { id: "projects", step: "build", title: "Projects", meaning: "the artifacts I've built" },
  { id: "experience", step: "test", title: "Experience", meaning: "tested in production" },
  { id: "about", step: "release", title: "About", meaning: "release notes on the person" },
  { id: "contact", step: "deploy", title: "Let's work together", meaning: "deploy me to your team" },
];
