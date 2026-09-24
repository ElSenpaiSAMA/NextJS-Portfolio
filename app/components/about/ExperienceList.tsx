import type { EducationItem, ExperienceItem } from "../../data/types";

export function ExperienceList({ items }: { items: ExperienceItem[] }) {
  return (
    <ul className="space-y-8">
      {items.map((item) => (
        <li key={`${item.organization}-${item.role}`}>
          <p className="font-medium">{item.role}</p>
          <p className="text-sm text-muted">
            {item.organization} · {item.period}
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm marker:text-border">
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export function EducationList({ items }: { items: EducationItem[] }) {
  return (
    <ul className="space-y-6">
      {items.map((item) => (
        <li key={item.title}>
          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-muted">
            {item.organization} · {item.period}
          </p>
          {item.note && <p className="mt-1 text-sm text-muted">{item.note}</p>}
        </li>
      ))}
    </ul>
  );
}
