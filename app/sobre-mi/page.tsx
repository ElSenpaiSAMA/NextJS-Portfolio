"use client";

// Componente de página About Me

import Image from "next/image";
import { useState } from "react";

export default function SobreMiPage() {
  const [activeTab, setActiveTab] = useState("data");

  const fullstackSkills = [
    { src: "/tecnologias/react-svgrepo-com.svg", name: "React", category: "Frontend" },
    { src: "/tecnologias/nextjs-icon-svgrepo-com.svg", name: "Next.js", category: "Framework" },
    { src: "/tecnologias/dotnet-svgrepo-com.svg", name: ".NET", category: "Backend" },
    { src: "/tecnologias/c--4.svg", name: "C#", category: "Language" },
    { src: "/tecnologias/typescript-official-svgrepo-com.svg", name: "TypeScript", category: "Language" },
    { src: "/tecnologias/node-js-svgrepo-com.svg", name: "Node.js", category: "Runtime" },
    { src: "/tecnologias/tailwind-svgrepo-com.svg", name: "Tailwind", category: "CSS" },
    { src: "/tecnologias/git-svgrepo-com.svg", name: "Git", category: "Version Control" },
    { src: "/tecnologias/sitecore-1.svg", name: "Sitecore", category: "CMS" },
    { src: "/tecnologias/sql server-svgrepo-com.svg", name: "SQL Server", category: "Database" },
    { src: "/tecnologias/mysql-logo-svgrepo-com.svg", name: "MySQL", category: "Database" },
    { src: "/tecnologias/python-svgrepo-com.svg", name: "Python", category: "Language" },
    { src: "/tecnologias/java-4-logo-svgrepo-com.svg", name: "Java", category: "Language" },
  ];

  const dataSkills = [
    { src: "/tecnologias/python-svgrepo-com.svg", name: "Python", category: "Language" },
    { src: "/tecnologias/n8n-color.svg", name: "N8N", category: "Automation" },
    { src: "/tecnologias/mysql-logo-svgrepo-com.svg", name: "MySQL", category: "Database" },
    { src: "/tecnologias/sql server-svgrepo-com.svg", name: "SQL Server", category: "Database" },
    { src: "/tecnologias/claude-color.svg", name: "Claude", category: "AI" },
    { src: "/tecnologias/ollama.svg", name: "Ollama", category: "AI" },
    { src: "/tecnologias/git-svgrepo-com.svg", name: "Git", category: "Version Control" },
    { src: "/tecnologias/firebase.svg", name: "Firebase", category: "Database" },
    { src: "/tecnologias/jupyter.svg", name: "Jupyter", category: "Data" },
    { src: "/tecnologias/Pandas.svg", name: "Pandas", category: "Data" },
    { src: "/tecnologias/Numpy.svg", name: "Numpy", category: "Data" },
    { src: "/tecnologias/GitHub Actions.svg", name: "GitHub Actions", category: "Automation" },
  ];

  const skills = activeTab === "fullstack" ? fullstackSkills : dataSkills;

  return (
    <section className="min-h-screen relative overflow-hidden bg-black px-4 sm:px-6 py-24 sm:py-32">
      <div className="absolute top-20 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-pink-600/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
            About Me
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-purple-500 to-pink-500 mt-2" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-start mb-12 md:mb-16">
          <div className="relative group w-full sm:w-[220px] max-w-[220px] mx-auto md:mx-0 flex-shrink-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-500"></div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/104552415.jpg"
                alt="Matias Speroni"
                width={220}
                height={290}
                className="object-cover w-full h-auto"
                quality={95}
                priority
              />
            </div>
          </div>

          <div className="flex-1 space-y-4 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Junior developer specialized in <span className="text-purple-400">.NET</span> and <span className="text-pink-400">React</span>.
              </p>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Hi, I&apos;m Matias, a junior developer specialized in .NET and React. 
                I currently work at Novicell ES as a junior backend developer. 
                I&apos;m currently training in <span className="text-purple-400">Data Engineering</span>.
              </p>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">I really like technology so I like to stay up to date and informed.
                Outside of computing, I really like going to the cinema and listening to music, they are two things I adore.
                I am passionate about traveling and discovering new places, I really like discovering the culture and especially the food of each country haha</p> 
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span>Barcelona, Spain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                <span>22 years old</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 md:mb-20">
          <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mb-4 md:mb-6">Stack</h3>

          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setActiveTab("data")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeTab === "data"
                  ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-purple-500/50"
              }`}
            >
              Learning Data Engineering
            </button>
            <button
              onClick={() => setActiveTab("fullstack")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeTab === "fullstack"
                  ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-purple-500/50"
              }`}
            >
              Full Stack
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              >
                <div className="flex flex-col items-center gap-3">
                  <Image src={skill.src} alt={skill.name} width={48} height={48} className="w-12 h-12" />
                  <h3 className="text-white font-semibold text-sm md:text-base">{skill.name}</h3>
                  <p className="text-gray-500 text-xs text-center">{skill.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
