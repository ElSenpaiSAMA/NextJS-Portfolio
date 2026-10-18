import Image from "next/image";
import { certifications, education } from "../../data/experience";
import { profile } from "../../data/profile";
import { Section } from "../ui/Section";

export function About() {
  return (
    <Section id="about" title="Who I am" className="pt-24 sm:pt-36">
      <div className="mx-auto mt-14 grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* Portrait in sunset duotone: greyscale photo multiplied over the gradient */}
        <figure className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-[image:var(--gradient-sunset)]">
          <Image
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="(min-width: 1024px) 28rem, 90vw"
            className="object-cover mix-blend-multiply grayscale contrast-125"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-6 pt-16">
            <span className="display block text-4xl text-haze">{profile.name}</span>
            <span className="mt-1 block text-sm text-haze-muted">{profile.location}</span>
          </figcaption>
        </figure>

        <div>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-haze-muted">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-dusk-line pt-10 lg:grid-cols-4">
            {profile.facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-sm text-haze-subtle">{label}</dt>
                <dd className="mt-1 font-semibold text-haze">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-10 border-t border-dusk-line pt-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-haze-subtle">Education</h3>
              <ul className="mt-4 space-y-5">
                {education.map((item) => (
                  <li key={item.title}>
                    <p className="font-semibold text-haze">{item.title}</p>
                    <p className="mt-0.5 text-sm text-haze-muted">
                      {item.institution}, <span className="tabular-nums">{item.period}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-haze-subtle">Certifications</h3>
              <ul className="mt-4 space-y-5">
                {certifications.map((item) => (
                  <li key={item.name}>
                    <p className="font-semibold text-haze">{item.name}</p>
                    <p className="mt-0.5 text-sm text-haze-muted">
                      {item.issuer}, <span className="tabular-nums">{item.date}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
