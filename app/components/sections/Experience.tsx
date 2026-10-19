import { experience } from "../../data/experience";
import { SECTION_PATHS } from "../../data/source";
import { Section } from "../ui/Section";

/** Career as `git log --graph`: the branch draws itself with the scroll, one commit node per company. */
export function Experience() {
  return (
    <Section id="experience" path={SECTION_PATHS.experience} title="Experience" className="bg-ink">
      <div className="relative mx-auto mt-14 max-w-6xl px-5 sm:px-8">
        <span aria-hidden="true" data-branch className="absolute bottom-4 left-[27px] top-2 w-px origin-top bg-gradient-to-b from-accent via-violet to-line sm:left-[39px]" />
        <ol>
          {experience.map((item) => (
            <li key={item.company} className="relative grid gap-6 pb-20 pl-10 last:pb-0 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:pl-14">
              <span aria-hidden="true" data-node className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-accent bg-ink shadow-[0_0_20px_var(--accent)]" />
              <div className="md:sticky md:top-24 md:self-start">
                <h3 className="display text-[clamp(2rem,4.5vw,3.5rem)]">{item.company}</h3>
                <p className="mt-2 font-mono text-xs text-fg-subtle">{item.location}</p>
              </div>
              <div data-reveal>
                <ul className="divide-y divide-line border-y border-line font-mono text-sm">
                  {item.roles.map((role) => (
                    <li key={role.title} className="flex flex-wrap items-baseline justify-between gap-x-4 py-3">
                      <span className="text-fg">{role.title}</span>
                      <span className="tabular-nums text-fg-subtle">{role.period}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 space-y-4 leading-relaxed text-fg-muted">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="relative pl-6">
                      <span aria-hidden="true" className="absolute left-0 font-mono text-mint">
                        +
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
