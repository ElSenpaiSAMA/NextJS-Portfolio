import { profile } from "../../data/profile";
import { PIPELINE, SECTION_PATHS } from "../../data/source";
import { stack } from "../../data/stack";
import { buildProfileSource } from "../../lib/source-code";
import { Section } from "../ui/Section";

/**
 * The profile as a TypeScript file, generated from the real data, beside the
 * build that ships it. On scroll each line "types" itself (`data-code-line`,
 * clip-path steps) and every CI stage ticks (`data-build-step`); the section
 * pins on desktop while that happens. Without JS it's simply all there.
 */
export function Source() {
  const lines = buildProfileSource(profile, stack);

  return (
    <Section
      id="source"
      path={SECTION_PATHS.source}
      title="Compiled from source."
      intro={profile.intro}
      className="bg-ink"
    >
      <div data-source className="mx-auto mt-14 grid max-w-6xl gap-5 px-5 sm:px-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <figure className="overflow-hidden rounded-xl border border-line bg-ink-2">
          <figcaption className="flex items-center gap-2 border-b border-line px-4 py-2.5 font-mono text-xs text-fg-subtle">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-pink" />
            {SECTION_PATHS.source}
          </figcaption>
          {/* The same facts are in the copy above and the sections below: decorative for AT */}
          <pre aria-hidden="true" className="p-4 font-mono text-[12.5px] leading-6 sm:p-5 sm:text-[13px]">
            <code>
              {lines.map((line, i) => (
                <span key={i} className="flex">
                  <span className="w-8 shrink-0 select-none pr-4 text-right text-fg-subtle">{i + 1}</span>
                  <span data-code-line className="min-w-0 whitespace-pre-wrap break-words">
                    {line.map((token, j) => (
                      <span key={j} className={`tok-${token.kind}`}>
                        {token.text}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        </figure>

        <div className="flex flex-col rounded-xl border border-line bg-ink-2 p-5 font-mono text-[13px]" data-testid="build-log">
          <p className="text-fg-subtle">
            <span className="text-accent">$</span> {PIPELINE.command}
          </p>
          <ol className="mt-4 space-y-2.5">
            {PIPELINE.stages.map((stage) => (
              <li key={stage} data-build-step className="flex items-center gap-3 text-fg-muted">
                <span aria-hidden="true" className="text-mint">
                  ✓
                </span>
                {stage}
              </li>
            ))}
          </ol>
          <p className="mt-auto border-t border-line pt-4 text-mint" data-build-done>
            Compiled successfully.
          </p>
        </div>
      </div>
    </Section>
  );
}
