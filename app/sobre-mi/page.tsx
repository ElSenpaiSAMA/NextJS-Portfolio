"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import GitHubChart from "../components/GitHubChart";

type StackItem = { src: string; name: string; category: string };

const STACK_TABS: { label: string; key: string; items: StackItem[] }[] = [
  {
    label: "Backend & Fullstack",
    key: "fullstack",
    items: [
      { src: "/tecnologias/dotnet-svgrepo-com.svg", name: ".NET", category: "Framework" },
      { src: "/tecnologias/c--4.svg", name: "C#", category: "Language" },
      { src: "/tecnologias/react-svgrepo-com.svg", name: "React", category: "Framework" },
      { src: "/tecnologias/nextjs-icon-svgrepo-com.svg", name: "Next.js", category: "Framework" },
      { src: "/tecnologias/typescript-official-svgrepo-com.svg", name: "TypeScript", category: "Language" },
      { src: "/tecnologias/fastapi.svg", name: "FastAPI", category: "Framework" },
      { src: "/tecnologias/sql server-svgrepo-com.svg", name: "SQL Server", category: "Database" },
      { src: "/tecnologias/postgresql.svg", name: "PostgreSQL", category: "Database" },
      { src: "/tecnologias/supabase.svg", name: "Supabase", category: "Database" },
      { src: "/tecnologias/firebase.svg", name: "Firebase", category: "Database" },
      { src: "/tecnologias/docker.svg", name: "Docker", category: "DevOps" },
      { src: "/tecnologias/git-svgrepo-com.svg", name: "Git", category: "Version Control" },
    ],
  },
  {
    label: "Data & AI",
    key: "data",
    items: [
      { src: "/tecnologias/python-svgrepo-com.svg", name: "Python", category: "Language" },
      { src: "/tecnologias/Pandas.svg", name: "Pandas", category: "Data" },
      { src: "/tecnologias/NumPy.svg", name: "NumPy", category: "Data" },
      { src: "/tecnologias/jupyter.svg", name: "Jupyter", category: "Data" },
      { src: "/tecnologias/ollama.svg", name: "Ollama", category: "AI" },
      { src: "/tecnologias/n8n-color.svg", name: "n8n", category: "Automation" },
      { src: "/tecnologias/GitHub Actions.svg", name: "GitHub Actions", category: "Automation" },
      { src: "/tecnologias/sql server-svgrepo-com.svg", name: "SQL Server", category: "Database" },
      { src: "/tecnologias/postgresql.svg", name: "PostgreSQL", category: "Database" },
      { src: "/tecnologias/supabase.svg", name: "Supabase", category: "Database" },
      { src: "/tecnologias/firebase.svg", name: "Firebase", category: "Database" },
    ],
  },
];

const AT_A_GLANCE = [
  { label: "Based in", value: "Barcelona, Spain" },
  { label: "Role", value: "Backend & Fullstack" },
  { label: "Specializing in", value: "Data & AI" },
  { label: "Languages", value: "ES (native) · EN" },
];

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-4 mb-3">
        <span
          className="font-serif text-sm"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-accent)",
            letterSpacing: "-0.01em",
          }}
        >
          {number}
        </span>
        <h2
          className="font-serif text-3xl sm:text-4xl font-normal"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-ink)",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
      </div>
      <div className="hairline" />
    </div>
  );
}

export default function SobreMiPage() {
  const [activeTab, setActiveTab] = useState("fullstack");
  const bioRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);

  const activeStack = STACK_TABS.find((t) => t.key === activeTab)?.items ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    [bioRef, stackRef, githubRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-20">
      {/* Bio section */}
      <section ref={bioRef} className="motion-safe">
        <SectionHeader number="01" title="About" />

        <div className="grid md:grid-cols-[220px_1fr] gap-10 items-start">
          {/* Photo */}
          <div className="relative w-[220px] mx-auto md:mx-0 flex-shrink-0 rounded overflow-hidden" style={{ borderRadius: "var(--radius-md)" }}>
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

          {/* Text */}
          <div className="space-y-5">
            <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Hi, I&apos;m Matias, a backend &amp; fullstack developer specialized in .NET and React.
              I currently work at Imagine, building data and AI products end to end, and I&apos;m
              continuing to grow my data side through a degree in Applied Data Science.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
              I have a solid understanding of Docker and CI/CD, which I use to package and deploy
              the applications and features I build, and I&apos;m familiar with common software
              development patterns and best practices.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
              I really like technology, so I like to stay curious and up to date. Outside of
              computing, I love going to the cinema and listening to music. I&apos;m also passionate
              about traveling and discovering new places — the culture and, especially, the food of
              each country.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
              I&apos;m committed to continuous learning and to delivering efficient, effective
              solutions in everything I take part in.
            </p>

            {/* At a glance */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-hairline">
              {AT_A_GLANCE.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--color-faint)" }}>
                    {label}
                  </dt>
                  <dd className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Stack section */}
      <section ref={stackRef} className="motion-safe">
        <SectionHeader number="02" title="Stack" />

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {STACK_TABS.map(({ label, key }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="px-4 py-2 text-sm font-medium border transition-colors duration-150"
              style={{
                borderRadius: "var(--radius-sm)",
                backgroundColor: activeTab === key ? "var(--color-ink)" : "transparent",
                color: activeTab === key ? "var(--color-paper)" : "var(--color-muted)",
                borderColor: activeTab === key ? "var(--color-ink)" : "var(--color-hairline)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {activeStack.map(({ src, name, category }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-4 bg-surface border border-hairline hover:border-hairline-hover transition-colors duration-200"
              style={{ borderRadius: "var(--radius-md)" }}
            >
              <Image
                src={src}
                alt={name}
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <span className="text-sm font-medium text-center" style={{ color: "var(--color-ink)" }}>
                {name}
              </span>
              <span
                className="text-xs uppercase tracking-wider text-center"
                style={{ color: "var(--color-faint)" }}
              >
                {category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub section */}
      <section ref={githubRef} className="motion-safe">
        <SectionHeader number="03" title="GitHub" />

        <div className="space-y-6">
          <div className="overflow-x-auto">
            <Image
              src="https://ghchart.rshah.org/A8642E/ElSenpaiSAMA"
              alt="GitHub contributions graph"
              width={720}
              height={112}
              className="w-full max-w-2xl"
              unoptimized
            />
          </div>
          <a
            href="https://github.com/ElSenpaiSAMA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex"
          >
            View profile on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
