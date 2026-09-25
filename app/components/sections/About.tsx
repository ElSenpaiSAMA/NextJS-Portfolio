import Image from "next/image";
import { profile } from "../../data/profile";
import { Section } from "../ui/Section";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Who I am" tinted>
      <div className="grid gap-12 md:grid-cols-[auto_1fr]">
        <div className="flex items-center gap-4 md:flex-col md:items-start">
          <Image
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            width={160}
            height={160}
            className="h-24 w-24 rounded-full border border-border object-cover md:h-40 md:w-40"
          />
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="text-sm text-muted">{profile.location}</p>
          </div>
        </div>

        <div>
          <div className="max-w-2xl space-y-4 leading-relaxed text-muted">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 lg:grid-cols-4">
            {profile.facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="label">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
