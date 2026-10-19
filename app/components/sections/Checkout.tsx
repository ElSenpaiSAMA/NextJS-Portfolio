import { profile } from "../../data/profile";
import { ButtonLink } from "../ui/ButtonLink";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "../ui/icons";

/** Stage 01 · checkout — who I am: role, intro, links, highlights. (The name is the stage's h1.) */
export function Checkout() {
  return (
    <>
      <p className="mt-6 text-xl font-medium text-accent-text sm:text-2xl">{profile.role}</p>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">{profile.intro}</p>
      <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-ok">
        <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-ok" />
        {profile.availability} in {profile.location}
      </p>
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
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-fg-subtle">
        {profile.highlights.map((highlight) => (
          <li key={highlight}>
            <span aria-hidden="true" className="text-accent-text">
              +{" "}
            </span>
            {highlight}
          </li>
        ))}
      </ul>
    </>
  );
}
