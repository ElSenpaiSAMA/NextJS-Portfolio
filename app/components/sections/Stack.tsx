import Image from "next/image";
import { stack } from "../../data/stack";
import type { StackItem } from "../../data/types";
import { Section } from "../ui/Section";

function Logo({ item }: { item: StackItem }) {
  return (
    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-paper">
      {item.logo ? <Image src={item.logo} alt="" width={18} height={18} unoptimized /> : <span className="h-1.5 w-1.5 rounded-full bg-mute-light" />}
    </span>
  );
}

/** The whole toolbox laid out like Apple's "Tech Specs" page: one row per group, hairlines between. */
export function Stack() {
  return (
    <Section id="stack" title="Tech specs." tone="light" intro="What I build, ship and run software with.">
      <div className="mx-auto mt-14 max-w-[980px] px-5 sm:px-8">
        {stack.map((group) => (
          <div key={group.id} data-reveal className="grid gap-5 border-t border-hairline-light py-8 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] md:gap-10">
            <div>
              <h3 className="text-[21px] font-semibold tracking-tight">{group.title}</h3>
            </div>
            <div>
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <Logo item={item} />
                    <span className="pt-1 text-[17px] leading-snug">
                      {item.name}
                      {item.detail && <span className="block text-[14px] text-mute-light">{item.detail}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
