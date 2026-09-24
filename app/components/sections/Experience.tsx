import { education, experience } from "../../data/experience";
import { Section } from "../ui/Section";

export function Experience() {
  return (
    <Section id="experience" index="04" title="Experience & education">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">Experience</h3>
          <ul className="mt-4 space-y-6">
            {experience.map((item) => (
              <li key={`${item.organization}-${item.role}`}>
                <p className="font-semibold">
                  {item.role} · {item.organization}
                </p>
                <p className="font-mono text-xs text-subtle">{item.period}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">Education</h3>
          <ul className="mt-4 space-y-6">
            {education.map((item) => (
              <li key={item.title}>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted">{item.organization}</p>
                <p className="font-mono text-xs text-subtle">{item.period}</p>
                {item.note && <p className="mt-1 text-sm text-muted">{item.note}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
