import { experience } from "../../data/experience";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { PIPELINE } from "../../data/ship";
import { stack } from "../../data/stack";
import { buildDeployScript } from "../../lib/deploy";
import { DeployWidget } from "../ship/DeployWidget";
import { ButtonLink } from "../ui/ButtonLink";

/** Who I am on the left; on the right, a button that ships this very site through its real pipeline. */
export function Hero() {
  const steps = buildDeployScript(PIPELINE.stages, { projects, stack, experience });

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative">
      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-fg-muted">
            <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-ok" />
            {profile.availability} in {profile.location}
          </p>
          <h1 id="hero-heading" className="display mt-6 text-[clamp(3.25rem,9vw,7rem)]">
            Matias Speroni
          </h1>
          <p className="mt-4 text-xl font-medium text-accent-text sm:text-2xl">{profile.role}</p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#projects" variant="primary">
              View work
            </ButtonLink>
            <ButtonLink href="#contact">Get in touch</ButtonLink>
            <ButtonLink href={profile.githubUrl} external>
              GitHub
            </ButtonLink>
            <ButtonLink href={profile.linkedinUrl} external>
              LinkedIn
            </ButtonLink>
            {profile.cvUrl && (
              <ButtonLink href={profile.cvUrl} download>
                CV
              </ButtonLink>
            )}
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-fg-subtle">
            {profile.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div>
          <DeployWidget steps={steps} command={PIPELINE.command} />
          <p className="mt-3 text-center font-mono text-xs text-fg-subtle">These are the real CI stages this site goes through on every push.</p>
        </div>
      </div>
    </section>
  );
}
