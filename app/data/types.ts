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

export interface StackItem {
  name: string;
  /** Path under /public/stack; omitted items render as text only. */
  logo?: string;
}

export interface StackGroup {
  id: string;
  title: string;
  items: StackItem[];
  /** Optional footnote, e.g. what is being learned next in this area. */
  note?: string;
}
