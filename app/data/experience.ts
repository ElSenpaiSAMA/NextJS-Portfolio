import type { Certification, EducationItem, ExperienceItem } from "./types";

/** From the CV, most recent first. */
export const experience: ExperienceItem[] = [
  {
    company: "Imagine Group",
    location: "Barcelona, Spain",
    roles: [{ title: "Software Developer", period: "05/2026 – 07/2026" }],
    highlights: [
      "Built CI/CD pipelines with GitHub Actions that build and publish Docker images, deployed automatically to a self-hosted Coolify hub.",
      "Kept a separate database and environment for every app, so dev and production never mixed. Access to the hub runs through Pomerium Zero Trust.",
      "dm-tools: built the data integrations behind a suite of ~20 AI marketing tools. Pulled data from Meta, TikTok, Google Ads, GA4, Shopify and Merchant Center and turned it into automated performance reports, using SQL on PostgreSQL/Supabase.",
      "Imagine OS: a multi-org PSA platform on Supabase (PostgreSQL + RLS) that tracks margin and utilization per client, project and person. Also built an AI assistant that can take actions inside the platform through tool/function calling, not just answer questions.",
      "AdSpark: an AI app for creative ideation that analyzes a brand straight from its URL, fully translated into Spanish, English and Catalan (Next.js 16, React 19, Supabase, OpenAI).",
    ],
  },
  {
    company: "Novicell ES",
    location: "Barcelona, Spain",
    roles: [
      { title: "Backend Developer", period: "05/2025 – 03/2026" },
      { title: "Backend Intern", period: "11/2024 – 05/2025" },
    ],
    highlights: [
      "Built C# and .NET integrations on Sitecore across 3+ simultaneous client projects, delivering across sprints with no production incidents.",
      "Sprint-based delivery: planning, reviews and coordination with project managers; contributed to Next.js frontends when needed.",
      "Promoted from intern to developer in under 6 months — the only one on the team that year — after learning C# and Sitecore on real production codebases.",
    ],
  },
];

export const education: EducationItem[] = [
  { title: "Degree in Applied Data Science", institution: "UOC (Universitat Oberta de Catalunya)", period: "Expected 09/2026" },
  { title: "CFGS in Multiplatform App Development (DAM)", institution: "Prat Educació, Barcelona", period: "09/2023 – 05/2025" },
  { title: "Electronic Technician", institution: "Instituto Leonardo Murialdo, Buenos Aires", period: "03/2019 – 12/2022" },
];

export const certifications: Certification[] = [
  { issuer: "IBM", name: "Python for Data Science, AI & Development", date: "03/2026" },
  { issuer: "IBM", name: "Introduction to Data Engineering", date: "03/2026" },
  { issuer: "UTN.BA", name: "Python 3, Beginner Level", date: "2023" },
  { issuer: "UTN.BA", name: "Fundamentals of Programming", date: "2022" },
];
