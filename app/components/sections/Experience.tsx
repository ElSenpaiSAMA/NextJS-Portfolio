import { experience } from "../../data/experience";
import { Section } from "../ui/Section";

/**
 * Career as `git log --graph`: one branch line down the left, a node per
 * company, roles as commits with their dates and highlights as added lines.
 */
export function Experience() {
  return (
    <Section id="experience" title="Experience" className="pt-24 sm:pt-32">
      <ol className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">
        {experience.map((item, i) => (
          <li key={item.company} className="relative grid gap-6 pb-14 pl-9 last:pb-0 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12 md:pl-12">
            {/* Branch line + node */}
            <span aria-hidden="true" className={`absolute left-[7px] top-2 w-px bg-line ${i === experience.length - 1 ? "h-4" : "bottom-0"}`} />
            <span aria-hidden="true" className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-amber bg-console" />

            <div className="md:sticky md:top-24 md:self-start">
              <h3 className="font-mono text-2xl font-bold tracking-tight text-fg sm:text-3xl">{item.company}</h3>
              <p className="mt-1 font-mono text-sm text-fg-subtle">{item.location}</p>
            </div>

            <div>
              <ul className="space-y-2 font-mono text-sm">
                {item.roles.map((role) => (
                  <li key={role.title} className="flex flex-wrap items-baseline justify-between gap-x-4 rounded border border-line bg-panel px-4 py-2.5">
                    <span className="font-medium text-amber">{role.title}</span>
                    <span className="tabular-nums text-fg-muted">{role.period}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-3 leading-relaxed text-fg-muted">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="relative pl-6">
                    <span aria-hidden="true" className="absolute left-0 font-mono text-green">
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
    </Section>
  );
}
