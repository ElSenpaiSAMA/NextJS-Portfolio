import Image from "next/image";
import type { CSSProperties } from "react";
import { SECTION_PATHS } from "../../data/source";
import { stack } from "../../data/stack";
import { Section } from "../ui/Section";

const ALL = stack.flatMap((group) => group.items.map((item) => item.name));
const HALF = Math.ceil(ALL.length / 2);
const TAPES = [ALL.slice(0, HALF), ALL.slice(HALF)];

/**
 * Two tapes of every technology sliding in opposite directions (CSS, frozen
 * with reduced motion; the copies are aria-hidden), then the full list grouped
 * like the CV, as the "dependencies" of the engineer.
 */
export function Stack() {
  return (
    <Section id="stack" path={SECTION_PATHS.stack} title="Stack" intro="What I build, ship and run software with." className="bg-ink">
      <div aria-hidden="true" className="mt-14 space-y-3 overflow-hidden border-y border-line py-6">
        {TAPES.map((names, row) => (
          <div key={row} className="tape" data-direction={row ? "reverse" : "normal"} style={{ "--tape-duration": `${names.length * 3.2}s` } as CSSProperties}>
            {[0, 1].map((copy) => (
              <p key={copy} className="display flex shrink-0 text-[clamp(2.25rem,5vw,4rem)]">
                {names.map((name) => (
                  <span key={name} className="px-6 text-fg-subtle transition-colors hover:text-fg">
                    {name}
                    <span className="pl-12 text-accent">/</span>
                  </span>
                ))}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-x-10 gap-y-12 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {stack.map((group) => (
          <div key={group.id} data-reveal>
            <h3 className="font-mono text-sm text-accent">{group.title}</h3>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-fg">
                    {item.logo ? <Image src={item.logo} alt="" width={14} height={14} unoptimized /> : <span className="h-1 w-1 rounded-full bg-ink" />}
                  </span>
                  <span>
                    {item.name}
                    {item.detail && <span className="block font-mono text-xs text-fg-subtle">{item.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
