import type { Profile } from "./types";

const REPO_URL = "https://github.com/ElSenpaiSAMA/NextJS-Portfolio";

export const profile: Profile = {
  name: "Matias Speroni",
  role: "Junior Platform / DevOps Engineer",
  location: "Barcelona, Spain",
  availability: "Open to junior Platform / DevOps roles",
  valueProposition:
    "I build the pipelines, environments and automation that let teams ship software safely — with a backend developer's understanding of what runs inside them.",
  email: "mnicolas03sp@gmail.com",
  githubUrl: "https://github.com/ElSenpaiSAMA",
  linkedinUrl: "https://www.linkedin.com/in/matias-speroni",
  // Drop the PDF in public/cv.pdf and set this to "/cv.pdf" to show the button.
  cvUrl: null,
  about: [
    "Backend and fullstack developer moving into platform engineering. The part of the job I enjoy most is the one around the code: pipelines, environments, and making deploys boring.",
    "I learn by building in public — every project below links to its repo, including the gaps I still have to close.",
  ],
  languages: ["Spanish", "English"],
  formspreeId: "mrbzwjdp",
  repoUrl: REPO_URL,
  ciWorkflowUrl: `${REPO_URL}/actions/workflows/ci.yml`,
  ciBadgeUrl: `${REPO_URL}/actions/workflows/ci.yml/badge.svg`,
};
