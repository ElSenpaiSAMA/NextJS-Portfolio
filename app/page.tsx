import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Stack } from "./components/sections/Stack";
import { Whoami } from "./components/sections/Whoami";
import { Command } from "./components/terminal/Command";
import { certifications, experience } from "./data/experience";
import { STAGES } from "./data/pipeline";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { stack } from "./data/stack";
import { siteUrl } from "./lib/site";
import { stageLogs } from "./lib/stage-logs";

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

/**
 * The page is a terminal session: one command per section, in order (each a
 * stage of `make deploy`), inside a terminal pane.
 */
export default function HomePage() {
  const logs = stageLogs({ profile, stack, projects, experience, certifications });
  const output = {
    top: <Whoami />,
    stack: <Stack />,
    projects: <Projects />,
    experience: <Experience />,
    about: <About />,
    contact: <Contact logs={logs} />,
  };
  return (
    <div className="mx-auto max-w-5xl px-4 sm:border-x sm:border-line sm:bg-surface/40 sm:px-10">
      {STAGES.map((stage) => (
        <Command key={stage.id} stage={stage} heading={stage.id !== "top"}>
          {output[stage.id]}
        </Command>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
    </div>
  );
}
