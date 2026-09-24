import type { Metadata } from "next";
import { SkillGroups, SkillLegend } from "../components/skills/SkillGroups";
import { PageHeader } from "../components/ui/PageHeader";
import { skillCategories } from "../data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description: "Platform and DevOps skills grouped by area, each with an honest level and where it was used.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="What I work with"
        intro="Grouped by area, each with an honest level. Where it says “used in projects”, there is a public repository behind it."
      >
        <div className="mt-8">
          <SkillLegend />
        </div>
      </PageHeader>
      <SkillGroups categories={skillCategories} />
    </>
  );
}
