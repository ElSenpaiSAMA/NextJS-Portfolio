import type { StackGroup } from "./types";

/**
 * Full stack from the CV, grouped by area. Levels are the CV's own
 * self-assessment; items without a level in the CV show none.
 * Logos live in public/stack; items without one show their initials.
 */
export const stack: StackGroup[] = [
  {
    id: "cicd",
    title: "CI/CD & Automation",
    items: [
      { name: "GitHub Actions", logo: "/stack/github-actions.svg", level: "Intermediate" },
      { name: "Git", logo: "/stack/git.svg", level: "Intermediate" },
      { name: "Python scripting", logo: "/stack/python.svg", level: "Intermediate" },
      { name: "Bash", level: "Basic" },
      { name: "n8n", logo: "/stack/n8n.svg" },
    ],
  },
  {
    id: "containers-cloud",
    title: "Containers, Cloud & IaC",
    items: [
      { name: "Docker", logo: "/stack/docker.svg", level: "Intermediate" },
      { name: "Kubernetes", level: "Basic" },
      { name: "AWS", level: "Basic" },
      { name: "Terraform", level: "Basic" },
      { name: "Coolify (self-hosted PaaS)" },
      { name: "Vercel" },
    ],
  },
  {
    id: "systems-security",
    title: "Systems & Security",
    items: [
      { name: "Linux", level: "Intermediate" },
      { name: "Windows", level: "Advanced" },
      { name: "Pomerium Zero Trust" },
      { name: "Row Level Security" },
      { name: "JWT & role-based auth" },
      { name: "SSH, HTTPS/TLS", level: "Basic" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      { name: "C# / .NET", logo: "/stack/dotnet.svg" },
      { name: "Python", logo: "/stack/python.svg" },
      { name: "FastAPI", logo: "/stack/fastapi.svg" },
      { name: "REST APIs" },
      { name: "EF Core" },
      { name: "Prisma" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { name: "React", logo: "/stack/react.svg" },
      { name: "Next.js", logo: "/stack/nextjs.svg" },
      { name: "TypeScript", logo: "/stack/typescript.svg" },
      { name: "Tailwind CSS", logo: "/stack/tailwind.svg" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    items: [
      { name: "PostgreSQL", logo: "/stack/postgresql.svg", level: "Intermediate" },
      { name: "SQL Server", logo: "/stack/sqlserver.svg" },
      { name: "MySQL", logo: "/stack/mysql.svg" },
      { name: "Supabase", logo: "/stack/supabase.svg" },
      { name: "Firebase", logo: "/stack/firebase.svg" },
    ],
  },
  {
    id: "data-ai",
    title: "Data & AI",
    items: [
      { name: "ETL & KPI modeling" },
      { name: "Pandas", logo: "/stack/pandas.svg" },
      { name: "NumPy", logo: "/stack/numpy.svg" },
      { name: "Jupyter", logo: "/stack/jupyter.svg" },
      { name: "AI agents & tool calling" },
      { name: "Ollama", logo: "/stack/ollama.svg" },
    ],
  },
];
