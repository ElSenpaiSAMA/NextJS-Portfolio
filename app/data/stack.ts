import type { StackGroup } from "./types";

/** Full stack, grouped by area. Logos live in public/stack. */
export const stack: StackGroup[] = [
  {
    id: "backend",
    title: "Backend",
    items: [
      { name: ".NET", logo: "/stack/dotnet.svg" },
      { name: "C#", logo: "/stack/csharp.svg" },
      { name: "Node.js", logo: "/stack/nodejs.svg" },
      { name: "FastAPI", logo: "/stack/fastapi.svg" },
      { name: "Python", logo: "/stack/python.svg" },
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
    id: "devops",
    title: "DevOps & Tooling",
    items: [
      { name: "Docker", logo: "/stack/docker.svg" },
      { name: "GitHub Actions", logo: "/stack/github-actions.svg" },
      { name: "Git", logo: "/stack/git.svg" },
      { name: "Vercel" },
      { name: "Playwright" },
    ],
    note: "Learning next: Kubernetes, Terraform and AWS.",
  },
  {
    id: "data",
    title: "Databases",
    items: [
      { name: "SQL Server", logo: "/stack/sqlserver.svg" },
      { name: "PostgreSQL", logo: "/stack/postgresql.svg" },
      { name: "Supabase", logo: "/stack/supabase.svg" },
      { name: "Firebase", logo: "/stack/firebase.svg" },
    ],
  },
  {
    id: "data-ai",
    title: "Data & AI",
    items: [
      { name: "Pandas", logo: "/stack/pandas.svg" },
      { name: "NumPy", logo: "/stack/numpy.svg" },
      { name: "Jupyter", logo: "/stack/jupyter.svg" },
      { name: "Ollama", logo: "/stack/ollama.svg" },
      { name: "n8n", logo: "/stack/n8n.svg" },
    ],
  },
];
