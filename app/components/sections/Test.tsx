import { certifications, experience } from "../../data/experience";
import { stack } from "../../data/stack";
import { techMentioned } from "../../lib/tags";
import { TechTag } from "../ui/TechTag";

/** Stage 04 · test — experience as test suites run in production, then the certifications as verified checks. */
export function Test() {
  return (
    <>
      <ol className="mt-10 space-y-5">
        {experience.map((item) => {
          const tags = techMentioned(item.highlights, stack);
          return (
            <li key={item.company} data-reveal className="card p-6 sm:p-7">
              <p className="font-mono text-[11px] text-fg-subtle">
                <span aria-hidden="true">suite </span>
                {item.location}
              </p>
              <h3 className="display mt-2 text-3xl sm:text-4xl">{item.company}</h3>
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
                  <li key={highlight} className="relative pl-6">
                    <span aria-hidden="true" className="absolute left-0 font-mono text-ok">
                      ✓
                    </span>
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

      <div data-reveal className="mt-10">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">Certifications</h3>
        <ul className="mt-4 divide-y divide-line rounded-ui border border-line bg-surface">
          {certifications.map((cert) => (
            <li key={cert.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3.5">
              <span className="flex items-baseline gap-3">
                <span aria-hidden="true" className="font-mono text-ok">
                  ✓
                </span>
                <span className="font-medium">{cert.name}</span>
              </span>
              <span className="font-mono text-xs text-fg-subtle">
                {cert.issuer} · {cert.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
