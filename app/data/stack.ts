import type { StackGroup } from "./types";

/**
 * Full stack from the CV, grouped by area (same groups as the CV's
 * "Technical skills"). Logos live in public/stack — the originals plus
 * Simple Icons (CC0) tinted with each brand colour; items without one show
 * their initials.
 */
export const stack: StackGroup[] = [
  {
    id: "cicd",
    title: "CI/CD & Automation",
    items: [
      { name: "GitHub Actions", logo: "/stack/github-actions.svg" },
      { name: "GitLab CI", logo: "/stack/gitlab.svg" },
      { name: "Git", logo: "/stack/git.svg" },
      { name: "Python scripting", logo: "/stack/python.svg" },
      { name: "Bash", logo: "/stack/bash.svg" },
    ],
  },
  {
    id: "containers",
    title: "Containers & Orchestration",
    items: [
      { name: "Docker", logo: "/stack/docker.svg" },
      { name: "Kubernetes", logo: "/stack/kubernetes.svg", detail: "Pods, Deployments, Services, Ingress" },
      { name: "Helm", logo: "/stack/helm.svg" },
    ],
  },
  {
    id: "cloud-iac",
    title: "Cloud & IaC",
    items: [
      { name: "AWS", logo: "/stack/aws.svg", detail: "EC2, S3, EKS, Aurora (RDS)" },
      { name: "Azure", detail: "AKS, Blob Storage, Azure SQL" },
      { name: "Google Cloud", logo: "/stack/gcp.svg", detail: "GKE, Cloud Storage, Cloud SQL" },
      { name: "Terraform", logo: "/stack/terraform.svg" },
    ],
  },
  {
    id: "observability-platform",
    title: "Observability & Platform",
    items: [
      { name: "Prometheus", logo: "/stack/prometheus.svg" },
      { name: "Grafana", logo: "/stack/grafana.svg" },
      { name: "Coolify (self-hosted PaaS)" },
      { name: "Vercel", logo: "/stack/vercel.svg" },
      { name: "Dev/prod environment isolation" },
    ],
  },
  {
    id: "systems-security",
    title: "Systems & Security",
    items: [
      { name: "Linux", logo: "/stack/linux.svg" },
      { name: "Windows" },
      { name: "Pomerium Zero Trust" },
      { name: "Row Level Security" },
      { name: "JWT & role-based auth" },
      { name: "Secrets & environment variables" },
      { name: "Least-privilege access" },
      { name: "SSH, HTTPS/TLS" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      { name: "C# / .NET", logo: "/stack/dotnet.svg" },
      { name: "Python", logo: "/stack/python.svg" },
      { name: "FastAPI", logo: "/stack/fastapi.svg" },
      { name: "SQL" },
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
      { name: "PostgreSQL", logo: "/stack/postgresql.svg" },
      { name: "SQL Server", logo: "/stack/sqlserver.svg" },
      { name: "MySQL", logo: "/stack/mysql.svg" },
      { name: "Supabase", logo: "/stack/supabase.svg" },
      { name: "Firebase", logo: "/stack/firebase.svg" },
    ],
  },
  {
    id: "ai-data",
    title: "AI Agents & Data",
    items: [
      { name: "AI agent management & orchestration" },
      { name: "AI coding agents" },
      { name: "AI agents & tool calling" },
      { name: "Structured-output LLM calls" },
      { name: "n8n", logo: "/stack/n8n.svg" },
      { name: "Ollama", logo: "/stack/ollama.svg" },
      { name: "ETL & KPI modeling" },
      { name: "Pandas", logo: "/stack/pandas.svg" },
      { name: "NumPy", logo: "/stack/numpy.svg" },
      { name: "Jupyter", logo: "/stack/jupyter.svg" },
    ],
  },
];
