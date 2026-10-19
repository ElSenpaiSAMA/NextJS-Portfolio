import Image from "next/image";
import { certifications, education } from "../../data/experience";
import { profile } from "../../data/profile";
import { Section } from "../ui/Section";

function ListBlock({ title, items }: { title: string; items: { key: string; primary: string; secondary: string }[] }) {
  return (
    <div>
      <h3 className="text-[21px] font-semibold tracking-tight">{title}</h3>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.key}>
            <p className="text-[17px] font-semibold">{item.primary}</p>
            <p className="mt-0.5 text-[15px] text-mute-dark">{item.secondary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Portrait, bio and the facts that matter, then education and certifications. */
export function About() {
  return (
    <Section id="about" title="Who I am." tone="dark">
      <div className="mx-auto mt-14 grid max-w-[980px] gap-12 px-5 sm:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
        <figure data-reveal className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-graphite">
          <Image src={profile.avatar} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 768px) 400px, 90vw" className="object-cover" />
        </figure>

        <div>
          <div className="space-y-5 text-[19px] leading-relaxed text-mute-dark">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-hairline-dark pt-10">
            {profile.facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-[15px] text-mute-dark">{label}</dt>
                <dd className="mt-1 text-[21px] font-semibold tracking-tight">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-[980px] gap-12 border-t border-hairline-dark px-5 pt-12 sm:px-8 md:grid-cols-2">
        <ListBlock
          title="Education"
          items={education.map((item) => ({ key: item.title, primary: item.title, secondary: `${item.institution}, ${item.period}` }))}
        />
        <ListBlock
          title="Certifications"
          items={certifications.map((item) => ({ key: item.name, primary: item.name, secondary: `${item.issuer}, ${item.date}` }))}
        />
      </div>
    </Section>
  );
}
