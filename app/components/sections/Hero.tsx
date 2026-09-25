import { profile } from "../../data/profile";
import { ButtonLink } from "../ui/ButtonLink";
import { ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from "../ui/icons";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
      <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm text-muted">
        <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
        {profile.availability} · {profile.location}
      </p>

      <h1 id="hero-heading" className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-3 text-xl font-medium text-accent sm:text-2xl">{profile.role}</p>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.intro}</p>

      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-subtle">
        {profile.highlights.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-subtle" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="#projects" variant="primary">
          View work <ArrowRightIcon />
        </ButtonLink>
        <ButtonLink href="#contact">Get in touch</ButtonLink>
        <ButtonLink href={profile.githubUrl} external>
          <GitHubIcon /> GitHub
        </ButtonLink>
        <ButtonLink href={profile.linkedinUrl} external>
          <LinkedInIcon /> LinkedIn
        </ButtonLink>
        {profile.cvUrl && (
          <ButtonLink href={profile.cvUrl} download>
            <DownloadIcon /> CV
          </ButtonLink>
        )}
      </div>
    </section>
  );
}
