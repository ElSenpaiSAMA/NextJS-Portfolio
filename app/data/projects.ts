export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string | null;
  siteLink?: string | null;
  image: string | null;
  inDevelopment?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Mira",
    description:
      "Multi-tenant AI search analytics platform (GEO/AEO) that tracks how brands appear across AI engines like ChatGPT, Claude and Perplexity — measuring visibility, position and sentiment.",
    tech: ["Next.js", "PostgreSQL", "Supabase", "Prisma", "OpenRouter"],
    siteLink: "https://mira-ia-demo.vercel.app",
    image: "/Mira.png",
    inDevelopment: true,
  },
  {
    id: 2,
    title: "Spotify Pipeline",
    description:
      "Automated ETL pipeline that extracts tracks from the Spotify API, transforms them with Pandas and loads into SQLite — fully scheduled and self-updating with GitHub Actions.",
    tech: ["Python", "Pandas", "SQLite", "Plotly", "GitHub Actions"],
    github: "https://github.com/ElSenpaiSAMA/Spotify-Track",
    image: "/top10.png",
  },
  {
    id: 3,
    title: "Study Bot",
    description:
      "AI-powered academic assistant with mock-exam generation from personal notes, schedule planning and Google Calendar integration.",
    tech: ["React", "FastAPI", "Ollama", "SQL Server"],
    github: "https://github.com/ElSenpaiSAMA/Proyecto_Study_Bot",
    image: "/study.jpg",
  },
  {
    id: 4,
    title: "Sala de Reservas",
    description:
      "Room booking platform with role-based authentication, admin panel and email notifications. Full backend in .NET with EF Core.",
    tech: [".NET", "Entity Framework", "SQL Server", "Resend API"],
    github: "https://github.com/ElSenpaiSAMA/SalaReservas",
    image: "/salareserva.jpg",
  },
  {
    id: 5,
    title: "Mundo del Libro",
    description:
      "Online bookstore with book search powered by the OpenLibrary API, real-time inventory and authentication via Firebase.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Firebase", "OpenLibrary API"],
    siteLink: "https://mundolibro-bay.vercel.app",
    image: "/mundo del libro.png",
  },
  {
    id: 6,
    title: "Portfolio",
    description:
      "This site. Personal portfolio built with Next.js, Tailwind CSS and TypeScript — designed with an editorial aesthetic and a step-by-step Git workflow.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/ElSenpaiSAMA/NextJS-Portfolio",
    image: "/pagina.png",
  },
];
