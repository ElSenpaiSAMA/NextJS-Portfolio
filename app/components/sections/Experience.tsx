import { experience } from "../../data/experience";
import { CheckIcon } from "../ui/icons";
import { Section } from "../ui/Section";

/** Each company as a chapter: name and place on the left, roles and what got done on the right. */
export function Experience() {
  return (
    <Section id="experience" title="Experience." tone="paper">
      <ol className="mx-auto mt-14 max-w-[980px] space-y-5 px-5 sm:px-8">
        {experience.map((item) => (
          <li key={item.company} data-reveal className="grid gap-8 rounded-[28px] bg-white p-7 sm:p-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12">
            <div>
              <h3 className="headline text-[clamp(1.75rem,3.2vw,2.5rem)]">{item.company}</h3>
              <p className="mt-1 text-[17px] text-mute-light">{item.location}</p>
            </div>
            <div>
              <ul className="divide-y divide-hairline-light border-y border-hairline-light">
                {item.roles.map((role) => (
                  <li key={role.title} className="flex flex-wrap items-baseline justify-between gap-x-4 py-3">
                    <span className="text-[19px] font-semibold">{role.title}</span>
                    <span className="text-[15px] tabular-nums text-mute-light">{role.period}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-4 text-[17px] leading-snug text-mute-light">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-link-light" />
                    <span>{highlight}</span>
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
