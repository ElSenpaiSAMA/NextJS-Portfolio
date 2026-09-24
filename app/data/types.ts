/**
 * Content model. Every section renders from these types, so copy changes
 * never touch components. Unknown facts use a bracketed COMPLETAR marker;
 * `npm run check:placeholders` lists every remaining one.
 */

/**
 * How honestly-sourced a skill is:
 * - used:     used in a public project (the context names it)
 * - basic:    coursework, small labs or base knowledge — no public project yet
 * - learning: on the roadmap, not used in a project yet
 */
export type SkillLevel = "used" | "basic" | "learning";

export interface Skill {
  name: string;
  level: SkillLevel;
  /** Where / how it was used. One short sentence. */
  context: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

/** Colour-codes a node in the architecture diagram. */
export type ArchitectureNodeKind = "trigger" | "process" | "store" | "deploy";

export interface ArchitectureNode {
  label: string;
  detail?: string;
  kind: ArchitectureNodeKind;
}

export interface ProjectLinks {
  repo?: string;
  demo?: string;
}

export interface CaseStudy {
  /** Also used as the DOM id / anchor (#<slug>). */
  slug: string;
  title: string;
  /** One line, DevOps angle first. */
  tagline: string;
  problem: string;
  solution: string;
  architecture: ArchitectureNode[];
  stack: string[];
  deployment: string;
  outcome: string;
  /** Honest gaps: what it still needs to be solid DevOps evidence. */
  nextSteps: string[];
  links: ProjectLinks;
  /** Featured projects render as full case studies; the rest as compact cards. */
  featured: boolean;
}

export type RoadmapStatus = "planned" | "in-progress" | "done";

export interface RoadmapItem {
  title: string;
  goal: string;
  /** Skills/gaps the project closes. */
  covers: string[];
  deliverables: string[];
  status: RoadmapStatus;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  points: string[];
}

export interface EducationItem {
  title: string;
  organization: string;
  period: string;
  note?: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  availability: string;
  valueProposition: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  /** Path under /public (e.g. "/cv.pdf"). null hides the CV button. */
  cvUrl: string | null;
  about: string[];
  languages: string[];
  /** Formspree form id used by the contact form. */
  formspreeId: string;
  repoUrl: string;
  ciWorkflowUrl: string;
  ciBadgeUrl: string;
}
