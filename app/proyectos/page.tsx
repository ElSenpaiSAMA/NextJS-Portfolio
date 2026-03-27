"use client";

import Image from "next/image";
import { projects } from "../data/projects";

export default function ProyectosPage() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-black px-4 sm:px-6 py-24 sm:py-32">
      <div className="absolute top-20 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-pink-600/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
            Projects
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-purple-500 to-pink-500 mt-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all duration-300 group flex flex-col h-[420px]"
            >
              <div className="h-32 sm:h-36 md:h-40 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 flex items-center justify-center border-b border-white/10 relative overflow-hidden flex-shrink-0">
                {project.image && (project.image.startsWith('/') || project.image.startsWith('http')) ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="text-white text-3xl sm:text-4xl opacity-60 group-hover:opacity-100 transition-opacity">
                    {project.image || "🚀"}
                  </span>
                )}
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-1 content-start">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs hover:border-purple-500/50 transition-all h-fit"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium transition-colors mt-auto"
                >
                  View Porject
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}

