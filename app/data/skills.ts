import type { SkillCategory, SkillLevel } from "./types";

export const SKILL_LEVEL_LABEL: Record<SkillLevel, string> = {
  used: "Used in projects",
  basic: "Basic",
  learning: "Learning",
};

export const SKILL_LEVEL_DESCRIPTION: Record<SkillLevel, string> = {
  used: "Used in a public project — the context says which one.",
  basic: "Base knowledge from coursework or small labs.",
  learning: "On my roadmap; not yet used in a project.",
};

export const skillCategories: SkillCategory[] = [
  {
    id: "containers",
    title: "Containers & orchestration",
    skills: [
      { name: "Docker", level: "basic", context: "Base knowledge; containerising my existing projects is the first roadmap step." },
      { name: "Docker Compose", level: "learning", context: "Planned for Study Bot's multi-service setup (UI, API, LLM, DB)." },
      { name: "Kubernetes (kind)", level: "learning", context: "Local cluster lab on the roadmap." },
      { name: "Helm", level: "learning", context: "Packaging the roadmap app for Kubernetes." },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD",
    skills: [
      { name: "GitHub Actions", level: "used", context: "Scheduled ETL with a test gate (Spotify Pipeline); lint, typecheck, test, E2E and Lighthouse pipeline (this site)." },
      { name: "Vercel", level: "used", context: "Git-based deploys and per-PR previews for this site and Mundo del Libro." },
      { name: "Git", level: "used", context: "Branch-per-change workflow on every project." },
      { name: "Playwright / Vitest", level: "used", context: "Unit, E2E and accessibility checks in this site's CI." },
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    skills: [
      { name: "Supabase", level: "used", context: "Managed PostgreSQL in [COMPLETAR: proyecto — ¿Mira?]." },
      { name: "Firebase", level: "used", context: "Authentication and data for Mundo del Libro." },
      { name: "AWS (ECS, ECR, IAM)", level: "learning", context: "Target platform for the containerised app on the roadmap." },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    skills: [
      { name: "Terraform", level: "learning", context: "Roadmap: provision the AWS setup with remote state and plan-on-PR." },
    ],
  },
  {
    id: "observability",
    title: "Observability",
    skills: [
      { name: "Structured logging", level: "used", context: "JSON logs for browser and server errors on this site, shipped to Vercel logs." },
      { name: "Prometheus", level: "learning", context: "Roadmap: metrics for the Kubernetes lab." },
      { name: "Grafana", level: "learning", context: "Roadmap: dashboards and alerts for the Kubernetes lab." },
    ],
  },
  {
    id: "linux",
    title: "Linux & scripting",
    skills: [
      { name: "Python scripting", level: "used", context: "ETL jobs and automation (Spotify Pipeline)." },
      { name: "Bash", level: "basic", context: "Day-to-day shell use and CI steps." },
      { name: "Linux", level: "basic", context: "Command line, processes, permissions — CI runners are Ubuntu." },
    ],
  },
  {
    id: "languages",
    title: "Languages & data",
    skills: [
      { name: "TypeScript / Node.js", level: "used", context: "Next.js apps, including this site." },
      { name: "C# / .NET", level: "used", context: "Backend with EF Core (Sala de Reservas)." },
      { name: "Python", level: "used", context: "FastAPI services and data pipelines." },
      { name: "SQL (PostgreSQL, SQL Server, SQLite)", level: "used", context: "Schemas and queries across backend projects." },
    ],
  },
];
