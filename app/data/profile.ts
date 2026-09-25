import type { Profile } from "./types";

const REPO_URL = "https://github.com/ElSenpaiSAMA/NextJS-Portfolio";

export const profile: Profile = {
  name: "Matias Speroni",
  role: "Backend & DevOps Engineer",
  location: "Barcelona, Spain",
  availability: "Available for work",
  intro:
    "Software developer moving into Platform / DevOps: CI/CD pipelines with GitHub Actions, Docker images and self-hosted deployments with isolated development and production environments.",
  highlights: ["Production experience since 2024", "Previously at Imagine Group & Novicell", "Applied Data Science at UOC"],
  about: [
    "Junior Platform / DevOps Engineer with a software development background. At Imagine I set up CI/CD pipelines with GitHub Actions that build and ship Docker images automatically, and kept dev and production running as separate, isolated environments for every app we deployed.",
    "In production since 11/2024 with .NET/C#, PostgreSQL and Python automation — promoted from intern to developer in under six months. I also build and manage AI agents and agentic workflows, use AI coding agents daily, and I'm growing into infrastructure as code, Kubernetes and cloud.",
    "Outside of work: technology, cinema and music — and travelling to discover new cultures.",
  ],
  facts: [
    { label: "Based in", value: "Barcelona, Spain" },
    { label: "Experience", value: "Since 11/2024" },
    { label: "Focus", value: "CI/CD · Containers · Cloud" },
    { label: "Languages", value: "Spanish (native) · English (B2)" },
  ],
  avatar: "/avatar.jpg",
  email: "mnicolas03sp@gmail.com",
  phone: "+34 689 51 82 35",
  phoneHref: "+34689518235",
  githubUrl: "https://github.com/ElSenpaiSAMA",
  // The slug has an accent ("matías") — without it LinkedIn resolves to a different person.
  linkedinUrl: "https://www.linkedin.com/in/matías-speroni",
  cvUrl: "/CV_Matias_Speroni_DO.pdf",
  formspreeId: "mrbzwjdp",
  repoUrl: REPO_URL,
  ciWorkflowUrl: `${REPO_URL}/actions/workflows/ci.yml`,
};
