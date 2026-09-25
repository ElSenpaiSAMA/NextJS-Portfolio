import type { Profile } from "./types";

const REPO_URL = "https://github.com/ElSenpaiSAMA/NextJS-Portfolio";

export const profile: Profile = {
  name: "Matias Speroni",
  role: "Backend & DevOps Engineer",
  location: "Barcelona, Spain",
  availability: "Available for work",
  intro:
    "I build production software end to end — from .NET and React backends to CI/CD pipelines, containers and data tools.",
  highlights: ["Previously at Imagine", "Studying Applied Data Science", "Focused on CI/CD & automation"],
  about: [
    "Backend and fullstack developer specialised in .NET and React, now moving into DevOps and platform work: CI/CD pipelines, containers and automation.",
    "At Imagine I built data and AI products end to end. I'm currently studying Applied Data Science and have a solid base in Docker, Git and GitHub Actions.",
    "Outside of work: technology, cinema and music — and travelling to discover new cultures.",
  ],
  facts: [
    { label: "Based in", value: "Barcelona, Spain" },
    { label: "Role", value: "Backend & DevOps" },
    { label: "Focus", value: "CI/CD · Data & AI" },
    { label: "Languages", value: "Spanish · English" },
  ],
  avatar: "/avatar.jpg",
  email: "mnicolas03sp@gmail.com",
  githubUrl: "https://github.com/ElSenpaiSAMA",
  linkedinUrl: "https://www.linkedin.com/in/matias-speroni",
  // Drop the PDF in public/cv.pdf and set this to "/cv.pdf" to show the button.
  cvUrl: null,
  formspreeId: "mrbzwjdp",
  repoUrl: REPO_URL,
  ciWorkflowUrl: `${REPO_URL}/actions/workflows/ci.yml`,
};
