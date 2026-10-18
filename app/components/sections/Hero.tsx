import type { CSSProperties, ReactNode } from "react";
import { PIPELINE } from "../../data/console";
import { profile } from "../../data/profile";
import { ClusterSvg } from "../scene/ClusterSvg";
import { HeroScene } from "../scene/HeroScene";
import { ButtonLink } from "../ui/ButtonLink";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "../ui/icons";
import { Window } from "../ui/Window";

/** Seconds: when the pipeline starts, the gap between stages and how long each one "runs". */
const START = 0.9;
const STAGE_GAP = 0.32;
const STAGE_RUN = 0.4;
const PIPELINE_END = START + PIPELINE.stages.length * STAGE_GAP + STAGE_RUN;

const at = (seconds: number, extra: Record<string, string | number> = {}) =>
  ({ "--at": `calc(var(--hero-offset, 0s) + ${seconds}s)`, ...extra }) as CSSProperties;

function Prompt({ command, start }: { command: string; start: number }) {
  return (
    <p className="term-line" style={at(start)}>
      <span className="text-cyan">~/portfolio</span> <span className="text-amber">$</span>{" "}
      <span className="term-typed text-fg" style={at(start, { "--chars": command.length, "--type-for": `${command.length * 0.035}s` })}>
        {command}
      </span>
    </p>
  );
}

function YamlLine({ k, children, start }: { k: string; children: ReactNode; start: number }) {
  return (
    <p className="term-line" style={at(start)}>
      <span className="text-cyan">{k}</span>
      <span className="text-fg-subtle">:</span> <span className="text-violet">{children}</span>
    </p>
  );
}

/**
 * The terminal: pushes this very site and runs its real CI stages, then
 * prints the profile. Pure CSS timing (see `.term-*` in globals.css); with
 * reduced motion it shows the finished run. Decorative — the same facts are
 * in the hero copy — so it is hidden from assistive tech.
 */
function PipelineTerminal() {
  const profileStart = PIPELINE_END + 0.3;
  const profileCommand = "cat profile.yml";
  const yamlStart = profileStart + profileCommand.length * 0.035 + 0.2;

  return (
    <Window title="~/portfolio  (zsh)" translucent className="hero-term w-full" bodyClassName="p-5 font-mono text-[13px] leading-relaxed sm:p-6 sm:text-sm">
      <div aria-hidden="true" data-testid="hero-terminal">
        <Prompt command={PIPELINE.command} start={0} />
        <p className="term-line mt-1 text-fg-subtle" style={at(START - 0.2)}>
          → ci.yml triggered
        </p>
        <ol>
          {PIPELINE.stages.map((stage, i) => {
            const shown = START + i * STAGE_GAP;
            return (
              <li key={stage} className="term-line pl-3" style={at(shown)}>
                <span className="term-status mr-3" style={{ "--done": `calc(var(--hero-offset, 0s) + ${shown + STAGE_RUN}s)` } as CSSProperties}>
                  <span className="term-pending text-amber">•</span>
                  <span className="term-done text-green">✓</span>
                </span>
                <span className="text-fg-muted">{stage}</span>
              </li>
            );
          })}
        </ol>
        <p className="term-line mt-1 text-green" style={at(PIPELINE_END)}>
          ✓ all checks passed
        </p>

        <div className="mt-4">
          <Prompt command={profileCommand} start={profileStart} />
          <YamlLine k="name" start={yamlStart}>
            {profile.name}
          </YamlLine>
          <YamlLine k="role" start={yamlStart + 0.1}>
            {profile.role}
          </YamlLine>
          <YamlLine k="location" start={yamlStart + 0.2}>
            {profile.location}
          </YamlLine>
          <YamlLine k="status" start={yamlStart + 0.3}>
            {profile.availability.toLowerCase()}
          </YamlLine>
          <p className="term-line mt-1" style={at(yamlStart + 0.45)}>
            <span className="text-cyan">~/portfolio</span> <span className="text-amber">$</span>
            <span className="cursor" />
          </p>
        </div>
      </div>
    </Window>
  );
}

/** Opening screen: who I am on the left, the site shipping itself on the right. */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]"
      />
      {/* The cluster: WebGL on tablets/desktops, SVG on phones */}
      <div className="absolute inset-0 -z-10">
        <HeroScene />
        <ClusterSvg />
        {/* Keeps the copy readable over the scene */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,var(--console)_70%)] md:bg-[linear-gradient(90deg,var(--console)_15%,transparent_60%),linear-gradient(180deg,transparent_70%,var(--console)_100%)]"
        />
      </div>
      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-12">
        <div data-hero-copy>
          <p className="inline-flex items-center gap-2 rounded border border-line bg-panel px-3 py-1.5 font-mono text-xs text-fg-muted">
            <span className="h-2 w-2 rounded-full bg-green" aria-hidden="true" />
            {profile.availability} in {profile.location}
          </p>

          <p aria-hidden="true" className="mt-8 font-mono text-sm text-fg-subtle">
            <span className="text-amber">$</span> whoami
          </p>
          <h1 id="hero-heading" className="mt-2 font-mono text-[clamp(2.75rem,8vw,5.75rem)] font-bold leading-[0.95] tracking-tight text-fg">
            Matias Speroni
          </h1>
          <p className="mt-5 font-mono text-lg font-medium text-amber sm:text-xl">{profile.role}</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">{profile.intro}</p>

          <ul className="mt-6 space-y-1.5 font-mono text-sm text-fg-muted">
            {profile.highlights.map((highlight) => (
              <li key={highlight}>
                <span aria-hidden="true" className="mr-2 text-fg-subtle">
                  #
                </span>
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-2.5">
            <ButtonLink href="#projects" variant="primary">
              View work
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
        </div>

        <div data-hero-term>
          <PipelineTerminal />
        </div>
      </div>
    </section>
  );
}
