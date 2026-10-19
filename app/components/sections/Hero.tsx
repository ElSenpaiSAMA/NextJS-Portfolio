import { HERO_TAGLINE } from "../../data/highlights";
import { heroFootage } from "../../data/media";
import { profile } from "../../data/profile";
import { ButtonLink } from "../ui/ButtonLink";
import { ScrubVideo } from "../ui/ScrubVideo";

/**
 * Opening shot, Apple keynote style: full-bleed data-center footage, the name
 * and role centred over it. On desktop the section pins and the scroll walks
 * the camera down the server aisle while the name recedes and the tagline
 * takes its place (ScrollChoreography). Phones: a muted loop.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate h-[100svh] min-h-[38rem] overflow-hidden bg-black">
      <div className="absolute inset-0 -z-10">
        <ScrubVideo clip={heroFootage} name="hero" />
        {/* Keeps the type readable: dark at the bottom (copy) and top (bar) */}
        <div
          aria-hidden="true"
          data-hero-veil
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.55)_0%,rgb(0_0_0/0.15)_35%,rgb(0_0_0/0.55)_62%,#000_100%)]"
        />
      </div>

      <div data-hero-copy className="flex h-full flex-col items-center justify-end px-5 pb-14 text-center sm:pb-20">
        <p className="inline-flex items-center gap-2 text-sm text-mute-dark sm:text-base">
          <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
          {profile.availability} in {profile.location}
        </p>
        <h1 id="hero-heading" className="headline mt-4 text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.95]">
          Matias Speroni
        </h1>
        <p className="headline ink-gradient mt-3 w-fit text-[clamp(1.6rem,4.4vw,3.4rem)]">{profile.role}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <ButtonLink href="#projects">View work</ButtonLink>
          <ButtonLink href="#contact" variant="link">
            Get in touch
          </ButtonLink>
          <ButtonLink href={profile.githubUrl} variant="link" external>
            GitHub
          </ButtonLink>
          <ButtonLink href={profile.linkedinUrl} variant="link" external>
            LinkedIn
          </ButtonLink>
          {profile.cvUrl && (
            <ButtonLink href={profile.cvUrl} variant="link" download>
              CV
            </ButtonLink>
          )}
        </div>

        <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-mute-dark">
          {profile.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>

      {/* Takes the name's place mid-scroll (desktop with motion only) */}
      <p
        aria-hidden="true"
        data-hero-tagline
        className="headline pointer-events-none absolute inset-x-5 top-1/2 hidden -translate-y-1/2 text-center text-[clamp(2.5rem,6.5vw,5.5rem)] opacity-0 md:block motion-reduce:hidden"
      >
        <span className="block">{HERO_TAGLINE[0]}</span>
        <span className="ink-gradient mx-auto block w-fit">{HERO_TAGLINE[1]}</span>
      </p>
    </section>
  );
}
