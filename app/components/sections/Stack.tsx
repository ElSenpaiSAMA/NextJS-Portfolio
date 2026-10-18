import Image from "next/image";
import { stack } from "../../data/stack";
import type { StackItem } from "../../data/types";
import { Section } from "../ui/Section";

function initials(name: string): string {
  return name
    .split(/[^A-Za-z0-9#.]+/) // letters only: "Coolify (self-hosted PaaS)" → "CS", not "C("
    .filter((word) => /^[A-Za-z0-9]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function Item({ item }: { item: StackItem }) {
  return (
    <li className="flex shrink-0 items-center gap-3 pr-10">
      {/* Light tile: several brand logos are black and would vanish on the night background. */}
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-haze">
        {item.logo ? (
          // Tiny SVGs that slide in from off-screen: load eagerly or they never intersect in time.
          <Image src={item.logo} alt="" width={20} height={20} unoptimized loading="eager" />
        ) : (
          <span aria-hidden="true" className="text-[11px] font-bold text-night">
            {initials(item.name)}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap text-xl font-semibold text-haze sm:text-2xl">
        {item.name}
        {item.detail && <span className="ml-2 text-base font-normal text-haze-subtle">{item.detail}</span>}
      </span>
    </li>
  );
}

/**
 * One slow marquee per group, alternating direction (CSS only, pauses on
 * hover, frozen with reduced motion). The second copy is aria-hidden so
 * screen readers hear each technology once.
 */
export function Stack() {
  return (
    <Section id="stack" title="Toolbox" intro="What I build, ship and run software with." className="pt-24 sm:pt-36">
      <div className="mt-14 space-y-2 overflow-hidden">
        {stack.map((group, row) => (
          <div key={group.id} className="marquee-row border-t border-dusk-line py-5 last:border-b">
            <h3 className="mx-auto mb-4 max-w-7xl px-5 text-sm font-medium text-haze-subtle sm:px-8">{group.title}</h3>
            <div
              className="marquee"
              data-direction={row % 2 ? "reverse" : "normal"}
              style={{ "--marquee-duration": `${30 + group.items.length * 6}s` } as React.CSSProperties}
            >
              <ul className="flex pl-5 sm:pl-8">
                {group.items.map((item) => (
                  <Item key={item.name} item={item} />
                ))}
              </ul>
              <ul className="flex" aria-hidden="true">
                {group.items.map((item) => (
                  <Item key={item.name} item={item} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
