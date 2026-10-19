import { certifications, experience } from "../../data/experience";
import { PROMPT } from "../../data/shell";
import { stack } from "../../data/stack";
import { shortHash } from "../../lib/shell";
import { techMentioned } from "../../lib/tags";
import { Prompt } from "../terminal/Prompt";
import { TechTag } from "../ui/TechTag";

/**
 * `git log` — each company is a commit (the hash is decorative, derived from
 * the name): roles with dates, what I did as added lines, and the
 * technologies those lines mention. Then `ls ~/certs`.
 */
export function Experience() {
  return (
    <>
      <ol className="mt-10 space-y-6">
        {experience.map((item, i) => {
          const tags = techMentioned(item.highlights, stack);
          return (
            <li key={item.company} data-reveal className="card p-6 sm:p-7">
              <p aria-hidden="true" className="text-sm">
                <span className="text-warn">commit {shortHash(item.company)}</span>
                {i === 0 && <span className="text-cyan"> (HEAD -&gt; main)</span>}
              </p>
              <p className="mt-1 text-sm text-fg-subtle">
                <span aria-hidden="true">Author: {PROMPT.user} · </span>
                {item.location}
              </p>
              <h3 className="display mt-5 text-2xl sm:text-3xl">{item.company}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
                {item.roles.map((role) => (
                  <li key={role.title} className="text-sm">
                    <span className="font-bold text-accent-text">{role.title}</span>
                    <span className="ml-2 tabular-nums text-cyan">{role.period}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 space-y-2.5 leading-relaxed text-fg-muted">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="relative pl-6">
                    <span aria-hidden="true" className="absolute left-0 font-bold text-ok">
                      +
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

      <div data-reveal className="mt-12">
        <p className="text-sm sm:text-base">
          <Prompt />
          <span aria-hidden="true">ls ~/certs</span>
        </p>
        <h3 className="sr-only">Certifications</h3>
        <ul className="mt-4 divide-y divide-line rounded-ui border border-line bg-surface">
          {certifications.map((cert) => (
            <li key={cert.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3.5 text-sm">
              <span className="flex items-baseline gap-3">
                <span aria-hidden="true" className="text-ok">
                  ✓
                </span>
                <span className="font-bold">{cert.name}</span>
              </span>
              <span className="text-fg-subtle">
                {cert.issuer} · {cert.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
