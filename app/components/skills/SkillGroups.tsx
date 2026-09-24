import { SKILL_LEVEL_DESCRIPTION, SKILL_LEVEL_LABEL } from "../../data/skills";
import type { SkillCategory, SkillLevel } from "../../data/types";
import { Block } from "../ui/Block";
import { Tag, type TagTone } from "../ui/Tag";

export const LEVEL_TONE: Record<SkillLevel, TagTone> = {
  used: "ok",
  basic: "info",
  learning: "warn",
};

const LEVELS: SkillLevel[] = ["used", "basic", "learning"];

export function SkillLegend() {
  return (
    <dl className="space-y-2 text-sm">
      {LEVELS.map((level) => (
        <div key={level} className="flex flex-wrap items-center gap-x-3">
          <dt>
            <Tag tone={LEVEL_TONE[level]}>{SKILL_LEVEL_LABEL[level]}</Tag>
          </dt>
          <dd className="text-muted">{SKILL_LEVEL_DESCRIPTION[level]}</dd>
        </div>
      ))}
    </dl>
  );
}

/** One Block per category; each skill is a row: name, level, where it was used. */
export function SkillGroups({ categories }: { categories: SkillCategory[] }) {
  return (
    <>
      {categories.map((category) => (
        <Block key={category.id} id={category.id} title={category.title}>
          <ul className="space-y-5">
            {category.skills.map((skill) => (
              <li key={skill.name}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-medium">{skill.name}</span>
                  <Tag tone={LEVEL_TONE[skill.level]}>{SKILL_LEVEL_LABEL[skill.level]}</Tag>
                </div>
                <p className="mt-1 text-sm text-muted">{skill.context}</p>
              </li>
            ))}
          </ul>
        </Block>
      ))}
    </>
  );
}
