import { ROADMAP_STATUS_LABEL } from "../../data/roadmap";
import type { RoadmapItem, RoadmapStatus } from "../../data/types";
import { Tag, type TagTone } from "../ui/Tag";

const STATUS_TONE: Record<RoadmapStatus, TagTone> = {
  planned: "neutral",
  "in-progress": "warn",
  done: "ok",
};

export function RoadmapList({ items }: { items: RoadmapItem[] }) {
  return (
    <ol className="space-y-10">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-5">
          <span aria-hidden="true" className="font-serif text-2xl leading-none text-subtle">
            {i + 1}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-serif text-xl tracking-tight">{item.title}</h3>
              <Tag tone={STATUS_TONE[item.status]}>{ROADMAP_STATUS_LABEL[item.status]}</Tag>
            </div>
            <p className="mt-2 text-muted">{item.goal}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm marker:text-border">
              {item.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-subtle">{item.covers.join(" · ")}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
