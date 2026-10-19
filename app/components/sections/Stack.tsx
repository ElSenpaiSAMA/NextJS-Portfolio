import { stack } from "../../data/stack";
import { Prompt } from "../terminal/Prompt";
import { StackPlayground } from "../terminal/StackPlayground";
import { TechTag } from "../ui/TechTag";

/** `cat stack.yaml` — every tool with its logo, grouped like the CV as YAML keys; then `./stack --gravity`, the physics box. */
export function Stack() {
  return (
    <>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted">What I build, ship and run software with.</p>
      <div className="mt-10 grid gap-x-10 gap-y-7 lg:grid-cols-2">
        {stack.map((group) => (
          <div key={group.id} data-reveal>
            <h3 className="text-sm font-bold text-magenta">
              {group.title}
              <span aria-hidden="true" className="text-fg-subtle">
                :
              </span>
            </h3>
            <ul className="mt-2.5 flex flex-wrap gap-2 border-l border-line pl-4">
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
      <p className="mt-14 text-sm sm:text-base">
        <Prompt />
        <span aria-hidden="true">./stack --gravity</span>
      </p>
      <div className="mt-4">
        <StackPlayground items={stack.flatMap((g) => g.items)} />
      </div>
    </>
  );
}
