import { stack } from "../../data/stack";
import { StackPlayground } from "../pipeline/StackPlayground";
import { TechTag } from "../ui/TechTag";

/** Stage 02 · install — the dependencies: every tool with its logo, grouped like the CV, then the physics box. */
export function Install() {
  return (
    <>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">What I build, ship and run software with.</p>
      <div className="mt-10 space-y-6">
        {stack.map((group) => (
          <div key={group.id} data-reveal>
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{group.title}</h3>
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
        <StackPlayground items={stack.flatMap((g) => g.items)} />
      </div>
    </>
  );
}
