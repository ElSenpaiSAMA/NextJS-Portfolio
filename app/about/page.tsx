import type { Metadata } from "next";
import { EducationList, ExperienceList } from "../components/about/ExperienceList";
import { Block } from "../components/ui/Block";
import { PageHeader } from "../components/ui/PageHeader";
import { TextLink } from "../components/ui/TextLink";
import { education, experience } from "../data/experience";
import { profile } from "../data/profile";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience and education of Matias Speroni, Junior Platform / DevOps Engineer in Barcelona.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Hello, I’m Matias." />

      <div className="max-w-xl space-y-5 pb-12 text-lg leading-relaxed">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <Block title="Experience">
        <ExperienceList items={experience} />
      </Block>

      <Block title="Education">
        <EducationList items={education} />
      </Block>

      <Block title="Details">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="label">Based in</dt>
            <dd className="mt-1">{profile.location}</dd>
          </div>
          <div>
            <dt className="label">Languages</dt>
            <dd className="mt-1">{profile.languages.join(", ")}</dd>
          </div>
          {profile.cvUrl && (
            <div>
              <dt className="label">CV</dt>
              <dd className="mt-1">
                <a href={profile.cvUrl} download className="underline decoration-border underline-offset-4 hover:text-accent">
                  Download PDF
                </a>
              </dd>
            </div>
          )}
        </dl>
        <div className="mt-8">
          <TextLink href="/contact">Get in touch</TextLink>
        </div>
      </Block>
    </>
  );
}
