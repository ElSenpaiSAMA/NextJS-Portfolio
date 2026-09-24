import { ROADMAP_STATUS_LABEL, roadmap } from "../../data/roadmap";
import type { RoadmapStatus } from "../../data/types";
import { Section } from "../ui/Section";
import { Tag, type TagTone } from "../ui/Tag";

const STATUS_TONE: Record<RoadmapStatus, TagTone> = {
  planned: "neutral",
  "in-progress": "warn",
  done: "ok",
};

export function Roadmap() {
  return (
    <Section
      id="roadmap"
      index="03"
      title="Roadmap"
      intro="What I am building next to close my gaps, ordered by impact. Each item moves to Projects when its repo is public."
    >
      <ol className="grid gap-4 md:grid-cols-3">
        {roadmap.map((item, i) => (
          <li key={item.title} className="flex flex-col rounded-lg border border-border bg-surface p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-sm text-accent">#{i + 1}</span>
              <Tag tone={STATUS_TONE[item.status]}>{ROADMAP_STATUS_LABEL[item.status]}</Tag>
            </div>
            <h3 className="mt-3 font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.goal}</p>
            <ul className="mt-4 flex-1 space-y-1.5 text-sm">
              {item.deliverables.map((d) => (
                <li key={d} className="flex gap-2">
                  <span aria-hidden="true" className="font-mono text-subtle">
                    –
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <span className="mt-4 flex flex-wrap gap-1.5">
              {item.covers.map((c) => (
                <Tag key={c}>{c}</Tag>
              ))}
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
