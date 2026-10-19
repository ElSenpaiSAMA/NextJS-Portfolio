import { stack } from "../../data/stack";
import { StackPlayground } from "../ship/StackPlayground";
import { Section } from "../ui/Section";
import { TechTag } from "../ui/TechTag";

/** The toolbox grouped like the CV, as logo chips — then all of it in a physics box to play with. */
export function Stack() {
  return (
    <Section id="stack" index={3} title="Tech stack" tagline="every tool with its logo, grouped by what it's for" intro="What I build, ship and run software with.">
      <div className="mt-10 space-y-7">
        {stack.map((group) => (
          <div key={group.id} data-reveal>
            <h3 className="font-semibold">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item.name} title={item.detail}>
                  <TechTag item={item} />
                  {item.detail && <span className="sr-only">: {item.detail}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <p className="hand mb-3 text-2xl text-fg-muted">or throw it all around ↓</p>
        <StackPlayground items={stack.flatMap((g) => g.items)} />
      </div>
    </Section>
  );
}
