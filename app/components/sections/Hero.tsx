import { experience } from "../../data/experience";
import { profile } from "../../data/profile";
import { ButtonLink } from "../ui/ButtonLink";
import { DownloadIcon, MailIcon } from "../ui/icons";

/** The opening: a handwritten hello, the name underlined by a squiggle that draws itself, status chips and CTAs. */
export function Hero() {
  const latest = experience[0];
  return (
    <section id="top" aria-labelledby="hero-heading" data-companion-section="top" className="pb-12 pt-8 sm:pt-14">
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em]">
        <span className="inline-flex items-center gap-2 text-ok">
          <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-ok" />
          {profile.availability} · {profile.location.split(",")[0]}
        </span>
        <span aria-hidden="true" className="text-fg-subtle">
          /
        </span>
        <span className="text-fg-muted">
          Previously {latest.roles[0].title} · {latest.company}
        </span>
      </div>

      <p className="hand mt-8 text-4xl text-fg-muted sm:text-5xl">hello, I&apos;m</p>
      <h1 id="hero-heading" className="display mt-1 text-[clamp(3rem,8vw,6.25rem)]">
        Matias Speroni
      </h1>
      <svg aria-hidden="true" viewBox="0 0 300 24" className="squiggle -mt-1 h-6 w-56 text-accent sm:w-72" fill="none">
        <path d="M4 14 C 30 2, 50 24, 78 12 S 128 2, 154 13 S 206 24, 232 11 S 280 4, 296 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <p className="mt-6 max-w-2xl text-xl leading-relaxed text-fg-muted sm:text-2xl">
        <strong className="font-semibold text-fg">{profile.role}</strong> in {profile.location}. {profile.intro}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="#projects" variant="primary">
          View work ↓
        </ButtonLink>
        <ButtonLink href="#contact">
          <MailIcon width={16} height={16} /> Get in touch
        </ButtonLink>
        {profile.cvUrl && (
          <ButtonLink href={profile.cvUrl} download>
            <DownloadIcon width={16} height={16} /> CV
          </ButtonLink>
        )}
      </div>

      <ul className="mt-8 flex flex-wrap gap-2 font-mono text-xs">
        {profile.highlights.map((highlight) => (
          <li key={highlight} className="rounded-lg border border-line bg-surface px-3 py-2 text-fg-muted">
            <span aria-hidden="true" className="mr-1.5 text-accent-text">
              ›
            </span>
            {highlight}
          </li>
        ))}
      </ul>
    </section>
  );
}
