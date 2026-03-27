"use client";

// Componente Hero de la página de inicio

import Image from "next/image";
import Link from "next/link";
import ProjectCarousel from "./ProjectCarousel";
import StarField from "./StarField";
import { projects } from "../data/projects";

export default function Hero() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-purple-950 to-black">
      <StarField />
      
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none z-0" />

      <section className="relative z-10 px-4 sm:px-6 pt-32 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            <div className="text-left">
              <div className="inline-block mb-4 md:mb-6">
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-950/50 border border-purple-500/50 rounded-full text-purple-300 text-xs md:text-sm font-medium backdrop-blur-sm mr-3 md:mr-4">
                  Full Stack Developer
                </span>
                 <span className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-950/50 border border-purple-500/50 rounded-full text-purple-300 text-xs md:text-sm font-medium backdrop-blur-sm">
                  Learning Data Engineer
                </span>        
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                  Hello, I&apos;m
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                  Matias Speroni
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-purple-200/80 mb-4 md:mb-6 font-light">
                Full Stack Developer
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                Full Stack programmer, specialized in .NET and React
              </p>
            </div>

            <div className="flex items-center justify-center md:pl-8 lg:pl-16">
              <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md aspect-square relative animate-float">
                <Image
                  src="/avatar.svg"
                  alt="Matias Speroni Illustration"
                  width={400}
                  height={400}
                  className="w-full h-full drop-shadow-[0_0_50px_rgba(168,85,247,0.6)]"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 md:gap-4 justify-center flex-wrap px-4">
            <Link
              href="/contacto"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium inline-block overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] text-sm sm:text-base"
            >
              <span className="relative z-10 text-white">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/sobre-mi"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-purple-500/50 text-purple-300 rounded-lg font-medium inline-block backdrop-blur-sm hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] text-sm sm:text-base"
            >
              Learn more
            </Link>
          </div>

          <div className="mt-10 mb-6 flex items-center justify-center">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <div className="mx-4 text-purple-500">⭐</div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 pb-20">
        <ProjectCarousel projects={featuredProjects} />
      </section>
    </div>
  );
}
