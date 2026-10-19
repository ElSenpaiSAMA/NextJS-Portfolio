import { HIGHLIGHTS, PIPELINE } from "../../data/highlights";
import { CheckIcon } from "../ui/icons";
import { Section } from "../ui/Section";

/** "Get the highlights." — Apple's bento of rounded tiles, every line from the CV. */
export function Highlights() {
  return (
    <Section id="highlights" title="Get the highlights." tone="paper">
      <ul className="mx-auto mt-14 grid max-w-[980px] gap-5 px-5 sm:px-8 md:grid-cols-3">
        {HIGHLIGHTS.map((tile) => (
          <li
            key={tile.title}
            data-reveal
            className={`flex min-h-[17rem] flex-col rounded-[28px] bg-white p-8 ${tile.wide ? "md:col-span-2" : ""}`}
          >
            <p className={`headline ink-gradient-deep w-fit whitespace-nowrap leading-none ${tile.wide ? "text-[clamp(2.75rem,5vw,4rem)]" : "text-[clamp(2.25rem,3.4vw,3rem)]"}`}>
              {tile.figure}
            </p>
            <h3 className="headline mt-auto pt-8 text-[clamp(1.4rem,2.2vw,1.75rem)] text-graphite">{tile.title}</h3>
            <p className="mt-3 text-[17px] leading-snug text-mute-light">{tile.body}</p>
          </li>
        ))}

        {/* The site as its own evidence: the real CI stages behind every push */}
        <li data-reveal className="rounded-[28px] bg-black p-8 text-white md:col-span-3" data-testid="pipeline-tile">
          <div className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center">
            <div>
              <h3 className="headline text-[clamp(1.75rem,3vw,2.5rem)]">
                This site <span className="ink-gradient">ships itself.</span>
              </h3>
              <p className="mt-3 text-[17px] leading-snug text-mute-dark">
                Every <code className="rounded bg-graphite px-1.5 py-0.5 text-[15px] text-white">{PIPELINE.command}</code> runs the
                full pipeline before anything reaches production.
              </p>
            </div>
            <ol className="grid gap-x-6 gap-y-3 text-[17px] sm:grid-cols-2">
              {PIPELINE.stages.map((stage) => (
                <li key={stage} data-stage className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ok/15 text-ok">
                    <CheckIcon width={14} height={14} />
                  </span>
                  {stage}
                </li>
              ))}
            </ol>
          </div>
        </li>
      </ul>
    </Section>
  );
}
