import type { Metadata } from "next";
import { ProjectList } from "./components/projects/ProjectList";
import { Block } from "./components/ui/Block";
import { ExternalLink } from "./components/ui/ExternalLink";
import { TextLink } from "./components/ui/TextLink";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { roadmap } from "./data/roadmap";
import { siteUrl } from "./lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** schema.org Person — helps search engines show the right name, role and profiles. */
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
  sameAs: [profile.githubUrl, profile.linkedinUrl],
};

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const next = roadmap[0];

  return (
    <>
      <header className="pb-16 pt-16 sm:pb-20 sm:pt-28">
        <p className="label mb-6">
          {profile.role} · {profile.location}
        </p>
        <h1 className="font-serif text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl">{profile.name}</h1>
        <p className="mt-8 max-w-xl text-xl leading-relaxed text-muted">{profile.valueProposition}</p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <TextLink href="/contact">Get in touch</TextLink>
          <ExternalLink href={profile.githubUrl}>GitHub</ExternalLink>
          <ExternalLink href={profile.linkedinUrl}>LinkedIn</ExternalLink>
          {profile.cvUrl && (
            <a
              href={profile.cvUrl}
              download
              className="underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Download CV
            </a>
          )}
        </div>
      </header>

      <Block title="Selected work">
        <ProjectList projects={featured} />
        <div className="mt-6">
          <TextLink href="/projects">All projects and roadmap</TextLink>
        </div>
      </Block>

      {next && (
        <Block title="Next">
          <p className="font-serif text-xl tracking-tight">{next.title}</p>
          <p className="mt-2 text-muted">{next.goal}</p>
          <p className="mt-3 text-sm text-subtle">{next.covers.join(" · ")}</p>
        </Block>
      )}

      <Block title="Status">
        <p className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
          {profile.availability}.
        </p>
        <p className="mt-2 text-muted">
          The quickest way to reach me is <a className="text-fg underline decoration-border underline-offset-4 hover:text-accent" href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>
      </Block>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
    </>
  );
}
