import { experience } from "../../data/experience";
import { stack } from "../../data/stack";
import { techMentioned } from "../../lib/tags";
import { Section } from "../ui/Section";
import { TechTag } from "../ui/TechTag";

/** One rich card per company: roles with dates, highlights, and the tech they mention (detected, with logos). */
export function Experience() {
  return (
    <Section id="experience" index={1} title="Experience" tagline="where I've shipped real software" intro="Backend and platform work in production, from client integrations to CI/CD and isolated environments.">
      <ol className="mt-10 space-y-5">
        {experience.map((item) => {
          const tags = techMentioned(item.highlights, stack);
          // Ongoing if the latest role has no end date yet ("… – Present").
          const ongoing = /present|actual/i.test(item.roles[0].period);
          return (
            <li key={item.company} data-reveal className="card p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{item.location}</p>
                {ongoing ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/40 bg-ok/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ok">
                    <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-ok" />
                    Current
                  </span>
                ) : (
                  <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-muted">Completed</span>
                )}
              </div>
              <h3 className="display mt-5 text-3xl sm:text-4xl">{item.company}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                {item.roles.map((role) => (
                  <li key={role.title} className="text-sm">
                    <span className="font-semibold text-accent-text">{role.title}</span>
                    <span className="ml-2 font-mono text-xs tabular-nums text-fg-subtle">{role.period}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 space-y-2.5 leading-relaxed text-fg-muted">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="relative pl-5">
                    <span aria-hidden="true" className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full bg-accent-strong" />
                    {highlight}
                  </li>
                ))}
              </ul>
              {tags.length > 0 && (
                <ul aria-label="Technologies mentioned" className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {tags.map((tech) => (
                    <li key={tech.name}>
                      <TechTag item={tech} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
