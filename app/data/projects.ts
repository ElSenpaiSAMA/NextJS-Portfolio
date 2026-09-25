import type { Project } from "./types";

const GITHUB = "https://github.com/ElSenpaiSAMA";

export const projects: Project[] = [
  {
    slug: "mira",
    title: "Mira",
    description:
      "Multi-tenant AI search analytics platform (GEO/AEO) that tracks how brands appear across AI engines like ChatGPT, Claude and Perplexity — measuring visibility, position and sentiment.",
    tech: ["Next.js", "PostgreSQL", "Supabase", "Prisma", "OpenRouter"],
    siteLink: "https://mira-ia-demo.vercel.app",
    image: "/projects/mira.png",
    inDevelopment: true,
  },
  {
    slug: "spotify-pipeline",
    title: "Spotify Pipeline",
    description:
      "Automated ETL pipeline that extracts tracks from the Spotify API, transforms them with Pandas and loads them into SQLite — scheduled weekly on GitHub Actions, with tests gating every run.",
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
    tech: [".NET", "Entity Framework", "SQL Server", "Resend API"],
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
