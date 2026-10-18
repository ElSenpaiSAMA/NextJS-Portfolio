import Image from "next/image";
import { stack } from "../../data/stack";
import type { StackGroup, StackItem } from "../../data/types";
import { Section } from "../ui/Section";
import { Window } from "../ui/Window";

function Logo({ item }: { item: StackItem }) {
  // Light tile: several brand logos are black and would vanish on the console background.
  return (
    <span aria-hidden="true" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-fg align-[-0.3em]">
      {item.logo ? <Image src={item.logo} alt="" width={14} height={14} unoptimized /> : <span className="h-1.5 w-1.5 rounded-full bg-console" />}
    </span>
  );
}

/** One YAML block: the group as a key, each technology as a list item, details as comments. */
function Group({ group }: { group: StackGroup }) {
  return (
    <div className="break-inside-avoid pb-3">
      <h3 className="code-line text-cyan">
        <span>
          {group.title}
          <span aria-hidden="true" className="text-fg-subtle">
            :
          </span>
        </span>
      </h3>
      <ul>
        {group.items.map((item) => (
          <li key={item.name} className="code-line">
            <span className="flex gap-2 pl-3">
              <span aria-hidden="true" className="text-fg-subtle">
                -
              </span>
              <span>
                <Logo item={item} /> <span className="text-fg">{item.name}</span>
                {item.detail && <span className="text-fg-subtle"> # {item.detail}</span>}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The whole toolbox as an open `stack.yml`, with an editor gutter. */
export function Stack() {
  return (
    <Section id="stack" title="Toolbox" intro="What I build, ship and run software with." className="pt-24 sm:pt-32">
      <div className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">
        <Window title={<span aria-hidden="true">~/portfolio/stack.yml</span>} bodyClassName="overflow-x-auto py-5 pr-5 font-mono text-sm leading-7">
          <div className="code-lines lg:columns-2 lg:gap-10">
            {stack.map((group) => (
              <Group key={group.id} group={group} />
            ))}
          </div>
        </Window>
      </div>
    </Section>
  );
}
