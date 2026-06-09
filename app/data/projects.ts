export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link: string | null;
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
    link: null,
    image: null,
    inDevelopment: true,
  },
  {
    id: 2,
    title: "Spotify Pipeline",
    description:
      "Automated ETL pipeline that extracts tracks from the Spotify API, transforms them with Pandas and loads into SQLite — fully scheduled and self-updating with GitHub Actions.",
    tech: ["Python", "Pandas", "SQLite", "Plotly", "GitHub Actions"],
    link: "https://github.com/ElSenpaiSAMA/Spotify-Track",
    image: "/top10.png",
  },
  {
    id: 3,
    title: "Study Bot",
    description:
      "AI-powered academic assistant with mock-exam generation from personal notes, schedule planning and Google Calendar integration.",
    tech: ["React", "FastAPI", "Ollama", "SQL Server"],
    link: "https://github.com/ElSenpaiSAMA/Proyecto_Study_Bot",
    image: "/study.jpg",
  },
  {
    id: 4,
    title: "Sala de Reservas",
    description:
      "Room booking platform with role-based authentication, admin panel and email notifications. Full backend in .NET with EF Core.",
    tech: [".NET", "Entity Framework", "SQL Server", "Resend API"],
    link: "https://github.com/ElSenpaiSAMA/SalaReservas",
    image: "/salareserva.jpg",
  },
];
