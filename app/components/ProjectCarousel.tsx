"use client";

// Componente personalizado de carrusel de proyectos
// Implementación manual del slider con navegación automática

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "../data/projects";

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedDescription, setDisplayedDescription] = useState("");
  const [visibleTags, setVisibleTags] = useState(0);

  const goToSlide = (index: number) => {
    if (index !== currentIndex && !isTransitioning) {
      setPrevIndex(currentIndex);
      setDisplayedTitle("");
      setDisplayedDescription("");
      setVisibleTags(0);
      setCurrentIndex(index);
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setDisplayedTitle("");
      setDisplayedDescription("");
      setVisibleTags(0);
      setCurrentIndex((prev) =>
        prev === projects.length - 1 ? 0 : prev + 1
      );
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, projects.length]);

  useEffect(() => {
    if (!isTransitioning && projects[currentIndex]) {
      const title = projects[currentIndex].title;
      let currentChar = 0;
      setDisplayedTitle("");

      const titleInterval = setInterval(() => {
        if (currentChar <= title.length) {
          setDisplayedTitle(title.substring(0, currentChar));
          currentChar++;
        } else {
          clearInterval(titleInterval);
        }
      }, 50);

      return () => clearInterval(titleInterval);
    }
  }, [currentIndex, isTransitioning, projects]);

  useEffect(() => {
    if (!isTransitioning && projects[currentIndex]) {
      const description = projects[currentIndex].description;
      let currentChar = 0;
      setDisplayedDescription("");

      const timeout = setTimeout(() => {
        const descInterval = setInterval(() => {
          if (currentChar <= description.length) {
            setDisplayedDescription(description.substring(0, currentChar));
            currentChar++;
          } else {
            clearInterval(descInterval);
          }
        }, 20);

        return () => clearInterval(descInterval);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isTransitioning, projects]);

  useEffect(() => {
    if (!isTransitioning && projects[currentIndex]) {
      setVisibleTags(0);
      const tagCount = projects[currentIndex].tech.length;
      let current = 0;

      const timeout = setTimeout(() => {
        const tagInterval = setInterval(() => {
          if (current < tagCount) {
            current++;
            setVisibleTags(current);
          } else {
            clearInterval(tagInterval);
          }
        }, 100);

        return () => clearInterval(tagInterval);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isTransitioning, projects]);

  if (!projects || projects.length === 0) {
    return null;
  }

  const currentProject = projects[currentIndex];
  const previousProject = projects[prevIndex];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient mb-2">
          Featured Projects
        </h2>
        <p className="text-gray-400 text-xs md:text-sm">Some of my most recent works</p>
      </div>

      <div className="relative">
        <div className="relative bg-gradient-to-br from-purple-900/20 via-black/40 to-pink-900/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
          
          <div className="relative aspect-video w-full overflow-hidden">
            <div className="absolute inset-0">
              {currentProject.image && (currentProject.image.startsWith('/') || currentProject.image.startsWith('http')) ? (
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-pink-600/30">
                  <span className="text-white text-6xl md:text-7xl drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                    {currentProject.image || "🚀"}
                  </span>
                </div>
              )}
            </div>

            {isTransitioning && (
              <div className="absolute inset-0 z-10 pointer-events-none animate-fadeOut">
                {previousProject.image && (previousProject.image.startsWith('/') || previousProject.image.startsWith('http')) ? (
                  <Image
                    src={previousProject.image}
                    alt={previousProject.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-pink-600/30">
                    <span className="text-white text-6xl md:text-7xl drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                      {previousProject.image || "🚀"}
                    </span>
                  </div>
                )}
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-20"></div>
          </div>

          <div className="relative p-4 sm:p-5 md:p-6 min-h-[240px] sm:min-h-[220px] md:min-h-[200px]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className={`mb-2 h-5 flex items-center transition-all duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-wave"></div>
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 h-[2rem] sm:h-[2.5rem] md:h-[3rem] flex items-center">
                  {displayedTitle}
                </h3>
                
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-3 h-[3rem] sm:h-[3.5rem] md:h-[4rem] overflow-hidden">
                  {displayedDescription}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8 sm:mb-6 md:mb-4 h-[3rem] sm:h-[3rem] md:h-[2.5rem] content-start">
              {currentProject.tech.map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className={`px-3 py-1 bg-white/5 border border-white/10 text-purple-300 rounded-md text-xs font-medium transition-all duration-300 h-fit ${
                    index < visibleTags ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex justify-center gap-1.5">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-10 h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                  aria-label={`Ir al proyecto ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 md:mt-8">
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-xs md:text-sm transition-colors group"
        >
          <span>View all projects</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}

