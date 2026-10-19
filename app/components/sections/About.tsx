import Image from "next/image";
import { education } from "../../data/experience";
import { profile } from "../../data/profile";

/** `cat about.md` — portrait, bio, facts as `key: value`, education. */
export function About() {
  return (
    <>
      <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <figure data-reveal className="card w-full max-w-xs overflow-hidden">
          <p aria-hidden="true" className="border-b border-line bg-surface-2 px-3 py-1.5 text-xs text-fg-subtle">
            avatar.jpg
          </p>
          <div className="relative aspect-[4/5]">
            <Image src={profile.avatar} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 768px) 300px, 80vw" className="object-cover" />
          </div>
        </figure>
        <div className="space-y-5 text-[17px] leading-relaxed text-fg-muted">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <dl className="mt-10 grid gap-x-8 gap-y-3 rounded-ui border border-line bg-surface p-5 sm:grid-cols-2">
        {profile.facts.map(({ label, value }) => (
          <div key={label} className="flex flex-wrap gap-x-2">
            <dt className="font-bold text-magenta">
              {label}
              <span aria-hidden="true" className="text-fg-subtle">
                :
              </span>
            </dt>
            <dd className="text-fg">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-10" data-reveal>
        <h3 className="text-sm font-bold text-magenta">
          Education
          <span aria-hidden="true" className="text-fg-subtle">
            :
          </span>
        </h3>
        <ul className="mt-4 space-y-3">
          {education.map((item) => (
            <li key={item.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-3">
              <span>
                <span className="font-bold">{item.title}</span>
                <span className="block text-sm text-fg-subtle">{item.institution}</span>
              </span>
              <span className="text-sm tabular-nums text-cyan">{item.period}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
