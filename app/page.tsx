import { Companion } from "./components/companion/Companion";
import { About } from "./components/sections/About";
import { Certifications } from "./components/sections/Certifications";
import { Contact } from "./components/sections/Contact";
import { Experience } from "./components/sections/Experience";
import { Hero } from "./components/sections/Hero";
import { Hub } from "./components/sections/Hub";
import { Projects } from "./components/sections/Projects";
import { Stack } from "./components/sections/Stack";
import { certifications, education, experience } from "./data/experience";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { PIPELINE } from "./data/ship";
import { stack } from "./data/stack";
import { buildAnswers, buildNarration } from "./lib/companion";
import { buildDeployScript } from "./lib/deploy";
import { siteUrl } from "./lib/site";

/** schema.org Person — helps search engines show the right name, role and profiles. */
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  image: `${siteUrl}${profile.avatar}`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
  sameAs: [profile.githubUrl, profile.linkedinUrl],
};

export default function HomePage() {
  // Everything the companion says is assembled here, at build time, from the real content.
  const content = { profile, projects, experience, stack, education, certifications };
  const companion = {
    name: profile.name,
    avatar: profile.avatar,
    narration: buildNarration(content),
    answers: buildAnswers(content),
    deploy: { steps: buildDeployScript(PIPELINE.stages, { projects, stack, experience }), command: PIPELINE.command },
  };

  return (
    <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-10 xl:grid-cols-[minmax(0,1fr)_25rem] xl:gap-14">
      <div className="min-w-0">
        <Hero />
        <Hub />
        <Experience />
        <Projects />
        <Stack />
        <Certifications />
        <About />
        <Contact />
      </div>
      <Companion data={companion} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
    </div>
  );
}
