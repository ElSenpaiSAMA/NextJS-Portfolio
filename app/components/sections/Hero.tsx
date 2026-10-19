import { CODE_RAMP } from "../../lib/ascii";
import { heroFootage } from "../../data/media";
import { profile } from "../../data/profile";
import { HERO_TAGLINE } from "../../data/source";
import { AsciiFootage } from "../fx/AsciiFootage";
import { ButtonLink } from "../ui/ButtonLink";

/**
 * Opening shot: a data-center aisle rendered live as ASCII code. On desktop the
 * section pins and the scroll walks down the aisle; halfway, the ASCII
 * "compiles" into the real footage and the tagline takes over
 * (ScrollChoreography). Phones: the loop in ASCII. Reduced motion: one frame.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate h-[100svh] min-h-[40rem] overflow-hidden bg-ink">
      <div className="absolute inset-0 -z-10">
        <AsciiFootage clip={heroFootage} name="hero" ramp={CODE_RAMP} contrast={2.3} scrub />
        {/* Readability: dark at the bottom-left where the copy sits */}
        <div
          aria-hidden="true"
          data-hero-veil
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_85%,rgb(7_8_11/0.95)_0%,rgb(7_8_11/0.75)_35%,transparent_70%),linear-gradient(180deg,rgb(7_8_11/0.6)_0%,transparent_20%,transparent_70%,var(--ink)_100%)]"
        />
      </div>

      <div data-hero-copy className="mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 sm:px-8 sm:pb-16">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-ink/70 px-3 py-1.5 font-mono text-xs text-fg-muted backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" aria-hidden="true" />
          {profile.availability} in {profile.location}
        </p>
        <h1 id="hero-heading" aria-label={profile.name} className="display mt-5 text-[clamp(3.5rem,13vw,11.5rem)]">
          <span aria-hidden="true" data-scramble data-scramble-now>
            {profile.name}
          </span>
        </h1>
        <p className="mt-4 font-mono text-lg text-accent before:text-fg-subtle before:content-['<'] after:text-fg-subtle after:content-['_/>'] sm:text-2xl">
          {profile.role}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href="#projects" variant="primary" cursor="view">
            View work
          </ButtonLink>
          <ButtonLink href="#contact">Get in touch</ButtonLink>
          <ButtonLink href={profile.githubUrl} external cursor="open">
            GitHub
          </ButtonLink>
          <ButtonLink href={profile.linkedinUrl} external cursor="open">
            LinkedIn
          </ButtonLink>
          {profile.cvUrl && (
            <ButtonLink href={profile.cvUrl} download cursor="save">
              CV
            </ButtonLink>
          )}
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-fg-subtle">
          {profile.highlights.map((highlight) => (
            <li key={highlight}>
              <span aria-hidden="true" className="text-accent">
                {"// "}
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <p aria-hidden="true" className="absolute bottom-6 right-5 hidden font-mono text-xs text-fg-subtle sm:right-8 md:block motion-reduce:hidden">
        scroll to compile <span className="text-accent">↓</span>
      </p>

      {/* Mid-scroll, over the real footage (desktop with motion only) */}
      <div aria-hidden="true" data-hero-tagline className="pointer-events-none absolute inset-x-5 top-1/2 mx-auto hidden max-w-5xl -translate-y-1/2 text-center opacity-0 md:block motion-reduce:hidden">
        <p className="font-mono text-sm text-accent">{"// render --mode=real"}</p>
        <p className="display mt-4 text-[clamp(2.75rem,6.5vw,6rem)] [text-shadow:0_4px_40px_rgb(7_8_11/0.9)]">{HERO_TAGLINE}</p>
      </div>
    </section>
  );
}
