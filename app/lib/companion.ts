import type { Certification, EducationItem, ExperienceItem, Profile, Project, StackGroup } from "../data/types";

/**
 * What the companion panel says. Everything is assembled from the real
 * content at build time (no AI, nothing invented), so it can't drift from the
 * CV data. Pure: unit-tested in companion.test.ts.
 */

export interface CompanionContent {
  profile: Profile;
  projects: Project[];
  experience: ExperienceItem[];
  stack: StackGroup[];
  education: EducationItem[];
  certifications: Certification[];
}

export type CompanionSection = "top" | "experience" | "projects" | "stack" | "certifications" | "about" | "contact";

/** Reading order of the page, for the companion's "Next" button. */
export const SECTION_ORDER: CompanionSection[] = ["top", "experience", "projects", "stack", "certifications", "about", "contact"];

const list = (items: string[]) => (items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);

/** One short narration per section, in first person. */
export function buildNarration(c: CompanionContent): Record<CompanionSection, string> {
  const firstName = c.profile.name.split(" ")[0];
  const technologies = c.stack.reduce((n, g) => n + g.items.length, 0);
  const latest = c.experience[0];
  const live = c.projects.filter((p) => !p.inDevelopment).length;
  const sameCity = c.experience.every((e) => e.location === latest.location);
  return {
    top: `Hi! I'm ${firstName}, ${c.profile.role} in ${c.profile.location}. Scroll and I'll walk you through it — or ask me something.`,
    experience: `Most recently I was at ${latest.company} (${latest.roles[0].period}) as ${latest.roles[0].title}. ${c.experience.length} companies so far${sameCity ? `, all in ${latest.location}` : ""}.`,
    projects: `${c.projects.length} projects here, ${live} shipped. ${c.projects[0].title} is the newest${c.projects[0].inDevelopment ? " and still in development" : ""}.`,
    stack: `${technologies} technologies across ${c.stack.length} groups, from ${list(c.stack.slice(0, 2).map((g) => g.title))} to ${c.stack[c.stack.length - 1].title}. Go ahead and throw them around.`,
    certifications: `${c.certifications.length} certifications, from ${list([...new Set(c.certifications.map((x) => x.issuer))])}.`,
    about: `${c.profile.about[c.profile.about.length - 1]}`,
    contact: `${c.profile.availability}. ${c.profile.email} is the quickest way to reach me.`,
  };
}

export interface Answer {
  question: string;
  answer: string;
}

/** The "Ask" tab: quick questions with answers built from the CV data. */
export function buildAnswers(c: CompanionContent): Answer[] {
  const facts = new Map(c.profile.facts.map((f) => [f.label, f.value]));
  return [
    {
      question: "Where have you worked?",
      answer: c.experience.map((e) => `${e.company}: ${e.roles.map((r) => `${r.title} (${r.period})`).join(", ")}`).join(". ") + ".",
    },
    {
      question: "What's your stack?",
      answer: c.stack.map((g) => `${g.title}: ${g.items.slice(0, 4).map((i) => i.name).join(", ")}${g.items.length > 4 ? "…" : ""}`).join(". ") + ".",
    },
    {
      question: "Are you available?",
      answer: `${c.profile.availability}, based in ${c.profile.location}. Open to Platform / DevOps and backend roles.`,
    },
    {
      question: "What did you study?",
      answer: c.education.map((e) => `${e.title}, ${e.institution} (${e.period})`).join(". ") + ".",
    },
    {
      question: "Which languages do you speak?",
      answer: facts.get("Languages") ?? "Spanish and English.",
    },
    {
      question: "How do I contact you?",
      answer: `Email ${c.profile.email} or call ${c.profile.phone}. LinkedIn and GitHub are linked below.`,
    },
  ];
}
