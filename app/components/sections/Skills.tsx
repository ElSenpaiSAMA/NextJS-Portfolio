import { SKILL_LEVEL_DESCRIPTION, SKILL_LEVEL_LABEL, skillCategories } from "../../data/skills";
import type { SkillLevel } from "../../data/types";
import { Section } from "../ui/Section";
import { Tag, type TagTone } from "../ui/Tag";

const LEVEL_TONE: Record<SkillLevel, TagTone> = {
  used: "ok",
  basic: "info",
  learning: "warn",
};

const LEVELS: SkillLevel[] = ["used", "basic", "learning"];

export function Skills() {
  return (
    <Section
      id="skills"
      index="01"
      title="Skills"
      intro="Grouped by area, with an honest level. If it says “used”, there is a public repo behind it."
    >
      <dl className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {LEVELS.map((level) => (
          <div key={level} className="flex items-center gap-2">
            <dt>
              <Tag tone={LEVEL_TONE[level]}>{SKILL_LEVEL_LABEL[level]}</Tag>
            </dt>
            <dd className="text-subtle">{SKILL_LEVEL_DESCRIPTION[level]}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <article key={category.id} className="rounded-lg border border-border bg-surface p-5">
            <h3 className="font-semibold">{category.title}</h3>
            <ul className="mt-4 space-y-3">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{skill.name}</span>
                    <Tag tone={LEVEL_TONE[skill.level]}>{SKILL_LEVEL_LABEL[skill.level]}</Tag>
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{skill.context}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
