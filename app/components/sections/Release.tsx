import Image from "next/image";
import { education } from "../../data/experience";
import { profile } from "../../data/profile";

/** Stage 05 · release — release notes on the person: portrait, bio, facts, education. */
export function Release() {
  return (
    <>
      <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <figure data-reveal className="card relative aspect-[4/5] w-full max-w-xs overflow-hidden">
          <Image src={profile.avatar} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 768px) 300px, 80vw" className="object-cover" />
        </figure>
        <div className="space-y-5 text-lg leading-relaxed text-fg-muted">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <dl className="mt-10 grid overflow-hidden rounded-ui border border-line sm:grid-cols-2">
        {profile.facts.map(({ label, value }) => (
          <div key={label} className="border-b border-line bg-surface p-5 sm:odd:border-r">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{label}</dt>
            <dd className="mt-1.5 text-lg font-semibold tracking-tight">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-10" data-reveal>
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">Education</h3>
        <ul className="mt-4 space-y-3">
          {education.map((item) => (
            <li key={item.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-3">
              <span>
                <span className="font-medium">{item.title}</span>
                <span className="block text-sm text-fg-subtle">{item.institution}</span>
              </span>
              <span className="font-mono text-xs tabular-nums text-fg-subtle">{item.period}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
