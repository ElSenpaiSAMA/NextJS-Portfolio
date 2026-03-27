// datos de proyectos

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
}

export const projects: Project[] = [

  {
    id: 1,
    title: "Mundo del Libro",
    description:
      "Online bookstore.",
    tech: ["Next.js", "Tailwind", "TypeScript","Firebase", "OpenLibrary API"],
    link: "https://mundolibro-bay.vercel.app",
    image: "/mundo del libro.png",
  },

  {
    id: 2,
    title: "Portfolio",
    description:
      "Personal website.",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    link: "https://github.com/ElSenpaiSAMA/Pagina",
    image: "/pagina.png",
  },

  {
    id: 3,
    title: "Sala de reservas",
    description:
      "Page for booking and creating rooms with admin and user roles.",
    tech: [".NET",  "Razor Pages", "Entity Framework", "SQL Server", "Tailwind", "Resend API"],
    link: "https://github.com/ElSenpaiSAMA/SalaReservas",
    image: "/salareserva.jpg",
  },

  {
    id: 4,
    title: "The Legend of Marina",
    description:
      "The Legend of Marina game, a 2D platformer based on Zelda.",
    tech: ["C#", "Unity"],
    link: "https://github.com/ElSenpaiSAMA/project-fire_rpg-game",
    image: "/tlom.png",
  },

  {
    id: 5,
    title: "Study Bot",
    description:
      "Academic assistant with AI for studying.",
    tech: ["React", "Python ", "API REST", "SQL Server", "Ollama", "FastApi"],
    link: "https://github.com/ElSenpaiSAMA/Proyecto_Study_Bot",
    image: "/study.jpg",
  },


];

