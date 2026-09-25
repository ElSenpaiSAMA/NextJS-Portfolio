/**
 * Content model. Every section renders from these types, so copy changes
 * never touch components. Unknown facts use a bracketed COMPLETAR marker;
 * `npm run check:placeholders` lists every remaining one.
 */

export interface Fact {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  availability: string;
  /** One-sentence introduction under the name. */
  intro: string;
  /** Short context items shown under the intro, e.g. "Previously at Imagine". */
  highlights: string[];
  about: string[];
  facts: Fact[];
  /** Path under /public for the portrait. */
  avatar: string;
  email: string;
  /** Display format, e.g. "+34 689 51 82 35". */
  phone: string;
  /** E.164 format for tel: links, e.g. "+34689518235". */
  phoneHref: string;
  githubUrl: string;
  linkedinUrl: string;
  /** Path under /public (e.g. "/cv.pdf"). null hides the CV button. */
  cvUrl: string | null;
  /** Formspree form id used by the contact form. */
  formspreeId: string;
  repoUrl: string;
  ciWorkflowUrl: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  /** Path under /public. */
  image: string;
  github?: string;
  siteLink?: string;
  inDevelopment?: boolean;
}

/** Self-assessed level, as stated in the CV. Omitted when the CV gives none. */
export type SkillLevel = "Basic" | "Intermediate" | "Advanced";

export interface StackItem {
  name: string;
  /** Path under /public/stack; items without a logo show their initials. */
  logo?: string;
  level?: SkillLevel;
}

export interface StackGroup {
  id: string;
  title: string;
  items: StackItem[];
}

export interface Role {
  title: string;
  period: string;
}

export interface ExperienceItem {
  company: string;
  location: string;
  /** Most recent first; several roles at one company (e.g. intern → developer). */
  roles: Role[];
  highlights: string[];
}

export interface EducationItem {
  title: string;
  institution: string;
  period: string;
}

export interface Certification {
  issuer: string;
  name: string;
  date: string;
}
