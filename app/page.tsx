import { Spine } from "./components/pipeline/Spine";
import { Stage } from "./components/pipeline/Stage";
import { Build } from "./components/sections/Build";
import { Checkout } from "./components/sections/Checkout";
import { Deploy } from "./components/sections/Deploy";
import { Install } from "./components/sections/Install";
import { Release } from "./components/sections/Release";
import { Test } from "./components/sections/Test";
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

const CONTENT = {
  top: <Checkout />,
  stack: <Install />,
  projects: <Build />,
  experience: <Test />,
  about: <Release />,
  contact: <Deploy />,
};

/** The page is a pipeline: one stage per section, a spine on the left, logs computed from the real content. */
export default function HomePage() {
  const logs = stageLogs({ profile, stack, projects, experience, certifications });
  return (
    <div className="relative mx-auto max-w-5xl pl-14 pr-5 sm:pl-24 sm:pr-8">
      <Spine />
      {STAGES.map((stage, i) => (
        <Stage key={stage.id} stage={stage} index={i} total={STAGES.length} log={logs[stage.id]} titleAs={stage.id === "top" ? "h1" : "h2"}>
          {CONTENT[stage.id]}
        </Stage>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
    </div>
  );
}
