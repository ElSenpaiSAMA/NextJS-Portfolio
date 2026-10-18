import { experience } from "../../data/experience";
import { Section } from "../ui/Section";

/** Chapters: the company name stays pinned (CSS sticky) while its highlights scroll past. */
export function Experience() {
  return (
    <Section id="experience" title="Experience" className="pt-24 sm:pt-36">
      <ol className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        {experience.map((item) => (
          <li key={item.company} className="grid gap-6 border-t border-dusk-line py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
            <div className="md:sticky md:top-28 md:self-start">
              <h3 className="display text-[clamp(2.5rem,6vw,5rem)] ink-sunset">{item.company}</h3>
              <p className="mt-2 text-sm text-haze-subtle">{item.location}</p>
            </div>
            <div>
              <ul className="space-y-2">
                {item.roles.map((role) => (
                  <li key={role.title} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-dusk-line pb-2">
                    <span className="text-lg font-semibold text-haze">{role.title}</span>
                    <span className="text-sm tabular-nums text-haze-muted">{role.period}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-4 text-base leading-relaxed text-haze-muted">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="relative pl-6">
                    <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-3 bg-sunset" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
