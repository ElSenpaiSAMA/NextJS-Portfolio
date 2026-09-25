import Image from "next/image";
import { stack } from "../../data/stack";
import { Section } from "../ui/Section";

export function Stack() {
  return (
    <Section id="stack" eyebrow="Tech stack" title="What I work with">
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => (
          <div key={group.id}>
            <h3 className="border-b border-border pb-3 text-sm font-semibold">{group.title}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-center gap-2.5 text-sm">
                  {/* Fixed white tile in both themes: some brand logos are black (Next.js) and vanish on dark. */}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-white">
                    {item.logo ? (
                      // SVG logos: nothing to optimize, so skip the image optimizer.
                      <Image src={item.logo} alt="" width={16} height={16} unoptimized />
                    ) : (
                      <span aria-hidden="true" className="text-[10px] font-bold text-slate-500">
                        {item.name.slice(0, 2)}
                      </span>
                    )}
                  </span>
                  {item.name}
                </li>
              ))}
            </ul>
            {group.note && <p className="mt-4 text-sm text-subtle">{group.note}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}
