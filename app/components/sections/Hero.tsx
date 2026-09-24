import { profile } from "../../data/profile";
import { ButtonLink } from "../ui/ButtonLink";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "../ui/icons";

const EVIDENCE = [
  {
    href: "#spotify-pipeline",
    label: "Scheduled ETL on GitHub Actions",
    detail: "weekly cron, tests gate every run, secrets in Actions",
  },
  {
    href: "#portfolio",
    label: "This site's CI/CD",
    detail: "lint · typecheck · unit · E2E · a11y · Lighthouse · preview per PR",
  },
  {
    href: "#portfolio",
    label: "Structured logging",
    detail: "browser + server errors as JSON in the platform logs",
  },
] as const;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="mx-auto max-w-5xl px-5 pb-16 pt-16 sm:pt-24">
      <p className="flex items-center gap-2 font-mono text-xs text-ok">
        <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
        {profile.availability} · {profile.location}
      </p>

      <h1 id="hero-heading" className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-2 text-xl text-muted sm:text-2xl">{profile.role}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed">{profile.valueProposition}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="#contact" variant="primary">
          <MailIcon /> Contact
        </ButtonLink>
        <ButtonLink href={profile.githubUrl} external>
          <GitHubIcon /> GitHub
        </ButtonLink>
        <ButtonLink href={profile.linkedinUrl} external>
          <LinkedInIcon /> LinkedIn
        </ButtonLink>
        {profile.cvUrl && (
          <ButtonLink href={profile.cvUrl} download>
            <DownloadIcon /> CV (PDF)
          </ButtonLink>
        )}
      </div>

      <div className="mt-12 rounded-lg border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2.5">
          <p className="font-mono text-xs text-subtle">evidence — start here</p>
          <a href={profile.ciWorkflowUrl} target="_blank" rel="noopener noreferrer" className="inline-flex">
            {/* Live badge from GitHub — an external SVG, so next/image adds nothing here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.ciBadgeUrl} alt="CI pipeline status for this site" height={20} width={120} className="h-5 w-auto" />
          </a>
        </div>
        <ul className="divide-y divide-border">
          {EVIDENCE.map(({ href, label, detail }) => (
            <li key={label}>
              <a href={href} className="group flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-3">
                <span className="font-medium group-hover:text-accent">{label}</span>
                <span className="font-mono text-xs text-subtle">{detail}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
