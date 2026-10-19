import { experience } from "../../data/experience";
import { SECTION_LABELS } from "../../data/ship";
import { Section } from "../ui/Section";

/** Career as a CHANGELOG: each company is a release, roles are the version tags, highlights are "Added" entries. */
export function Experience() {
  return (
    <Section id="experience" label={SECTION_LABELS.experience} title="Experience">
      <ol className="mx-auto mt-12 max-w-6xl space-y-4 px-5 sm:px-8">
        {experience.map((item) => (
          <li key={item.company} data-reveal className="rounded-ui border border-line bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                <span aria-hidden="true" className="mr-2 font-mono text-fg-subtle">
                  ##
                </span>
                {item.company}
              </h3>
              <p className="font-mono text-xs text-fg-subtle">{item.location}</p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.roles.map((role) => (
                <li key={role.title} className="inline-flex items-center gap-2 rounded-ui border border-line bg-surface-2 px-3 py-1.5 text-sm">
                  <span className="font-medium">{role.title}</span>
                  <span className="font-mono text-xs tabular-nums text-fg-subtle">{role.period}</span>
                </li>
              ))}
            </ul>
            <p aria-hidden="true" className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-ok">
              Added
            </p>
            <ul className="mt-3 space-y-3 leading-relaxed text-fg-muted">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="relative pl-5">
                  <span aria-hidden="true" className="absolute left-0 font-mono text-ok">
                    +
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
