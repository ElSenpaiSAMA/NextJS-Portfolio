import Image from "next/image";
import { education } from "../../data/experience";
import { profile } from "../../data/profile";
import { Section } from "../ui/Section";

/** Portrait, bio, the key facts as numbered spec sheets, and education. */
export function About() {
  return (
    <Section id="about" index={5} title="About me" tagline="the person behind the pipelines">
      <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <figure data-reveal className="card relative aspect-[4/5] w-full max-w-sm overflow-hidden">
          <Image src={profile.avatar} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 768px) 340px, 90vw" className="object-cover" />
        </figure>
        <div className="space-y-5 text-lg leading-relaxed text-fg-muted">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <dl className="mt-10 grid gap-4 sm:grid-cols-2">
        {profile.facts.map(({ label, value }, i) => (
          <div key={label} data-reveal className="card p-5">
            <dt className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
              <span>{label}</span>
              <span aria-hidden="true">sheet {String(i + 1).padStart(2, "0")}</span>
            </dt>
            <dd className="mt-2 text-xl font-semibold tracking-tight">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10" data-reveal>
        <h3 className="font-semibold">Education</h3>
        <ul className="mt-4 space-y-3">
          {education.map((item) => (
            <li key={item.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-3">
              <span>
                <span className="font-medium">{item.title}</span>
                <span className="block text-sm text-fg-subtle">{item.institution}</span>
              </span>
              <span className="font-mono text-xs tabular-nums text-fg-subtle">{item.period}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
