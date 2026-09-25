import type { Project } from "./types";

const GITHUB = "https://github.com/ElSenpaiSAMA";

export const projects: Project[] = [
  {
    slug: "mira",
    title: "Mira.IA",
    description:
      "Multi-tenant SaaS for AI search visibility (GEO/AEO): runs monitored prompts across ChatGPT, Claude, Perplexity and Gemini and extracts brand mentions, position and sentiment with structured-output LLM calls. JWT auth, server-side plan limits, daily scheduled runs and per-run cost tracking.",
    tech: ["Next.js 16", "PostgreSQL", "Supabase", "Prisma", "LLM APIs"],
    siteLink: "https://mira-ia-demo.vercel.app",
    image: "/projects/mira.png",
    inDevelopment: true,
  },
  {
    slug: "spotify-pipeline",
    title: "Spotify Pipeline",
    description:
      "Automated ETL that extracts top tracks from the Spotify API, cleans them with Pandas, loads SQLite and renders a Plotly chart. Scheduled weekly with GitHub Actions, which runs the tests and commits the refreshed data back to the repo with no manual steps.",
    tech: ["Python", "GitHub Actions", "Pandas", "SQLite", "Plotly"],
    github: `${GITHUB}/Spotify-Track`,
    image: "/projects/spotify-pipeline.png",
  },
  {
    slug: "study-bot",
    title: "Study Bot",
    description:
      "AI-powered academic assistant with mock-exam generation from personal notes, schedule planning and Google Calendar integration.",
    tech: ["React", "FastAPI", "Ollama", "SQL Server"],
    github: `${GITHUB}/Proyecto_Study_Bot`,
    image: "/projects/study-bot.jpg",
  },
  {
    slug: "sala-de-reservas",
    title: "Sala de Reservas",
    description:
      "Room booking platform with role-based authentication, admin panel and email notifications. Full backend in .NET with EF Core.",
    tech: [".NET", "EF Core", "SQL Server", "Tailwind CSS", "Resend API"],
    github: `${GITHUB}/SalaReservas`,
    image: "/projects/sala-de-reservas.jpg",
  },
  {
    slug: "mundo-del-libro",
    title: "Mundo del Libro",
    description:
      "Online bookstore with book search powered by the OpenLibrary API, real-time inventory and authentication via Firebase.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Firebase", "OpenLibrary API"],
    github: `${GITHUB}/libreria`,
    siteLink: "https://mundolibro-bay.vercel.app",
    image: "/projects/mundo-del-libro.png",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    description:
      "This site. Next.js and TypeScript with a full CI pipeline on GitHub Actions — lint, type-check, unit and E2E tests, accessibility and Lighthouse checks — plus structured error logging and preview deploys on Vercel.",
    tech: ["Next.js", "TypeScript", "GitHub Actions", "Playwright", "Vercel"],
    github: `${GITHUB}/NextJS-Portfolio`,
    image: "/projects/portfolio.png",
  },
];
