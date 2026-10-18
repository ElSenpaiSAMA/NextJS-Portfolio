import Image from "next/image";
import { certifications, education } from "../../data/experience";
import { profile } from "../../data/profile";
import { Section } from "../ui/Section";
import { Window } from "../ui/Window";

function ListBlock({ title, items }: { title: string; items: { key: string; primary: string; secondary: string }[] }) {
  return (
    <div>
      <h3 className="font-mono text-sm font-medium text-cyan">
        <span aria-hidden="true" className="text-fg-subtle">
          ##{" "}
        </span>
        {title}
      </h3>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.key}>
            <p className="font-medium text-fg">{item.primary}</p>
            <p className="mt-0.5 text-sm text-fg-muted">{item.secondary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** About as the repository's README: portrait, bio, key facts, education and certifications. */
export function About() {
  return (
    <Section id="about" title="Who I am" className="pt-24 sm:pt-32">
      <div data-reveal className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">
        <Window title={<span aria-hidden="true">~/portfolio/README.md</span>} bodyClassName="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <figure className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-md border border-line bg-console">
            <Image
              src={profile.avatar}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width: 1024px) 22rem, 90vw"
              className="object-cover grayscale-[35%] contrast-110"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-console via-console/80 to-transparent p-5 pt-14 font-mono">
              <span className="block text-lg font-bold text-fg">{profile.name}</span>
              <span className="mt-0.5 block text-xs text-fg-muted">{profile.location}</span>
            </figcaption>
          </figure>

          <div>
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-fg-muted">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 grid gap-x-6 gap-y-3 border-t border-line pt-8 font-mono text-sm sm:grid-cols-2">
              {profile.facts.map(({ label, value }) => (
                <div key={label} className="flex flex-wrap gap-x-2">
                  <dt className="text-cyan">
                    {label}
                    <span aria-hidden="true" className="text-fg-subtle">
                      :
                    </span>
                  </dt>
                  <dd className="text-fg">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-10 border-t border-line pt-8 sm:grid-cols-2">
              <ListBlock
                title="Education"
                items={education.map((item) => ({ key: item.title, primary: item.title, secondary: `${item.institution}, ${item.period}` }))}
              />
              <ListBlock
                title="Certifications"
                items={certifications.map((item) => ({ key: item.name, primary: item.name, secondary: `${item.issuer}, ${item.date}` }))}
              />
            </div>
          </div>
        </Window>
      </div>
    </Section>
  );
}
