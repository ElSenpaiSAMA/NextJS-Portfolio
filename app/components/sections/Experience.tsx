import { experience } from "../../data/experience";
import { Section } from "../ui/Section";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Career" title="Experience">
      <ol className="space-y-10">
        {experience.map((item) => (
          <li key={item.company} className="grid gap-4 border-b border-border pb-10 last:border-b-0 last:pb-0 md:grid-cols-[14rem_1fr] md:gap-10">
            <div>
              <h3 className="text-lg font-semibold">{item.company}</h3>
              <p className="text-sm text-subtle">{item.location}</p>
            </div>
            <div>
              <ul className="space-y-1">
                {item.roles.map((role) => (
                  <li key={role.title} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="font-medium text-accent">{role.title}</span>
                    <span className="text-sm tabular-nums text-subtle">{role.period}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-subtle">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
