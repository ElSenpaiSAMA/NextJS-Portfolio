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

function StackTile({ item }: { item: StackItem }) {
  return (
    // Fixed white tile in both themes: some brand logos are black (Next.js) and vanish on dark.
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-white">
      {item.logo ? (
        // SVG logos: nothing to optimize, so skip the image optimizer.
        <Image src={item.logo} alt="" width={16} height={16} unoptimized />
      ) : (
        <span aria-hidden="true" className="text-[10px] font-bold text-slate-600">
          {initials(item.name)}
        </span>
      )}
    </span>
  );
}

export function Stack() {
  return (
    <Section id="stack" eyebrow="Tech stack" title="What I work with" tinted>
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => (
          <div key={group.id}>
            <h3 className="border-b border-border pb-3 text-sm font-semibold">{group.title}</h3>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-center gap-2.5 text-sm">
                  <StackTile item={item} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
