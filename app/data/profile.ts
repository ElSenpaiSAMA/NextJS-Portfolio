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
    "Software developer moving into Platform / DevOps engineering. I build CI/CD pipelines with GitHub Actions, publish Docker images and deploy them to a self-hosted Coolify hub secured with Pomerium Zero Trust, with isolated dev and prod environments per application.",
    "In production since 11/2024 with .NET/C#, PostgreSQL and Python automation — promoted from intern to developer in under six months. I also build AI agents and agentic workflows, and I'm growing into infrastructure as code, Kubernetes and cloud.",
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
  linkedinUrl: "https://www.linkedin.com/in/matias-speroni",
  cvUrl: "/cv.pdf",
  formspreeId: "mrbzwjdp",
  repoUrl: REPO_URL,
  ciWorkflowUrl: `${REPO_URL}/actions/workflows/ci.yml`,
};
