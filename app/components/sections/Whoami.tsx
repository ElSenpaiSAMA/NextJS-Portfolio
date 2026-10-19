import { certifications, education, experience } from "../../data/experience";
import { STAGES } from "../../data/pipeline";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { LOGO } from "../../data/shell";
import { stack } from "../../data/stack";
import { since } from "../../lib/shell";
import { Shell } from "../terminal/Shell";
import { ButtonLink } from "../ui/ButtonLink";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "../ui/icons";

/** neofetch's palette row. */
const SWATCHES = ["bg-error", "bg-ok", "bg-warn", "bg-accent", "bg-magenta", "bg-cyan", "bg-fg"];

/** `neofetch` — who I am as a system summary (every value from the content), the intro, links, and the live shell. */
export function Whoami() {
  const technologies = stack.reduce((n, g) => n + g.items.length, 0);
  const shipped = projects.filter((p) => !p.inDevelopment).length;
  const rows = [
    { key: "Host", value: profile.location },
    { key: "Uptime", value: `in production since ${since(experience)}` },
    { key: "Packages", value: `${technologies} technologies` },
    { key: "Projects", value: `${projects.length} (${shipped} shipped)` },
    { key: "Certs", value: String(certifications.length) },
  ];

  return (
    <>
      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        <pre aria-hidden="true" className="shrink-0 text-[13px] font-bold leading-tight text-ok [text-shadow:0_0_18px_rgb(74_222_128/0.45)] sm:text-base">
          {LOGO.join("\n")}
        </pre>
        <div className="min-w-0 flex-1">
          <h1 id="top-heading" data-rise className="display text-[clamp(2.5rem,8vw,4.75rem)]">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-accent-text sm:text-xl">{profile.role}</p>
          <p aria-hidden="true" className="mt-4 overflow-hidden whitespace-nowrap text-fg-subtle">
            {"-".repeat(34)}
          </p>
          <dl className="mt-2 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 text-sm">
            {rows.map(({ key, value }) => (
              <div key={key} className="contents">
                <dt className="font-bold text-ok">{key}</dt>
                <dd className="text-fg">{value}</dd>
              </div>
            ))}
            <div className="contents">
              <dt className="font-bold text-ok">Status</dt>
              <dd className="inline-flex items-center gap-2 text-ok">
                <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-ok" />
                {profile.availability}
              </dd>
            </div>
          </dl>
          <p aria-hidden="true" className="mt-4 flex">
            {SWATCHES.map((s) => (
              <span key={s} className={`h-4 w-7 ${s}`} />
            ))}
          </p>
        </div>
      </div>

      <p className="mt-12 max-w-3xl text-lg leading-relaxed text-fg-muted">{profile.intro}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="#projects" variant="primary">
          View work
        </ButtonLink>
        <ButtonLink href="#contact">
          <MailIcon width={16} height={16} /> Get in touch
        </ButtonLink>
        <ButtonLink href={profile.githubUrl} external>
          <GitHubIcon width={16} height={16} /> GitHub
        </ButtonLink>
        <ButtonLink href={profile.linkedinUrl} external>
          <LinkedInIcon width={16} height={16} /> LinkedIn
        </ButtonLink>
        {profile.cvUrl && (
          <ButtonLink href={profile.cvUrl} download>
            <DownloadIcon width={16} height={16} /> CV
          </ButtonLink>
        )}
      </div>
      <ul className="mt-8 space-y-1 text-sm text-fg-subtle">
        {profile.highlights.map((highlight) => (
          <li key={highlight}>
            <span aria-hidden="true"># </span>
            {highlight}
          </li>
        ))}
      </ul>

      <Shell content={{ profile, stack, projects, experience, education, certifications, stages: STAGES }} />
    </>
  );
}
