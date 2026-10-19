import { certifications, education } from "../../data/experience";
import { profile } from "../../data/profile";
import { SECTION_PATHS } from "../../data/source";
import { AsciiPortrait } from "../fx/AsciiPortrait";
import { Section } from "../ui/Section";

function ListBlock({ title, items }: { title: string; items: { key: string; primary: string; secondary: string }[] }) {
  return (
    <div data-reveal>
      <h3 className="font-mono text-sm text-accent">{title}</h3>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.key}>
            <p className="font-medium">{item.primary}</p>
            <p className="mt-0.5 font-mono text-xs text-fg-subtle">{item.secondary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** README: ASCII portrait, bio, the key facts as a config block, then education and certifications. */
export function About() {
  return (
    <Section id="about" path={SECTION_PATHS.about} title="Who I am" className="bg-ink">
      <div className="mx-auto mt-14 grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <AsciiPortrait src={profile.avatar} alt={`Portrait of ${profile.name}`} />
        <div>
          <div className="space-y-5 text-lg leading-relaxed text-fg-muted">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
            {profile.facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="font-mono text-xs text-fg-subtle">{label}</dt>
                <dd className="mt-1 text-lg font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl gap-12 border-t border-line px-5 pt-12 sm:px-8 md:grid-cols-2">
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
