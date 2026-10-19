import Image from "next/image";
import { certifications, education } from "../../data/experience";
import { profile } from "../../data/profile";
import { SECTION_LABELS } from "../../data/ship";
import { Section } from "../ui/Section";

function ListBlock({ title, items }: { title: string; items: { key: string; primary: string; secondary: string }[] }) {
  return (
    <div data-reveal>
      <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-fg-subtle">{title}</h3>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.key}>
            <p className="font-medium">{item.primary}</p>
            <p className="mt-0.5 text-sm text-fg-subtle">{item.secondary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The README: portrait, bio, facts, education and certifications. */
export function About() {
  return (
    <Section id="about" label={SECTION_LABELS.about} title="Who I am">
      <div className="mx-auto mt-12 grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-14">
        <figure data-reveal className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-ui border border-line bg-surface-2">
          <Image src={profile.avatar} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 768px) 360px, 90vw" className="object-cover" />
        </figure>
        <div>
          <div className="space-y-5 text-lg leading-relaxed text-fg-muted">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-ui border border-line bg-line sm:grid-cols-2">
            {profile.facts.map(({ label, value }) => (
              <div key={label} className="bg-surface p-4">
                <dt className="font-mono text-xs text-fg-subtle">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="mx-auto mt-14 grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-2">
        <ListBlock
          title="Education"
          items={education.map((item) => ({ key: item.title, primary: item.title, secondary: `${item.institution}, ${item.period}` }))}
        />
        <ListBlock
          title="Certifications"
          items={certifications.map((item) => ({ key: item.name, primary: item.name, secondary: `${item.issuer}, ${item.date}` }))}
        />
      </div>
    </Section>
  );
}
