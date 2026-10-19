import Image from "next/image";
import { SECTION_LABELS } from "../../data/ship";
import { stack } from "../../data/stack";
import { StackPlayground } from "../ship/StackPlayground";
import { Section } from "../ui/Section";

/** Every technology falls into a physics box to play with; the grouped list below is the real content. */
export function Stack() {
  const items = stack.flatMap((group) => group.items);
  return (
    <Section id="stack" label={SECTION_LABELS.stack} title="Stack" intro="What I build, ship and run software with. Go ahead, throw it around.">
      <div className="mt-12">
        <StackPlayground items={items} />
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl gap-x-10 gap-y-10 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {stack.map((group) => (
          <div key={group.id} data-reveal>
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-fg-subtle">{group.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                    {item.logo ? <Image src={item.logo} alt="" width={16} height={16} unoptimized /> : <span className="h-1.5 w-1.5 rounded-full bg-fg-subtle" />}
                  </span>
                  <span>
                    {item.name}
                    {item.detail && <span className="block text-sm text-fg-subtle">{item.detail}</span>}
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
