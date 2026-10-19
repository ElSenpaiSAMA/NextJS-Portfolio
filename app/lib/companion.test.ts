import { describe, expect, it } from "vitest";
import { certifications, education, experience } from "../data/experience";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { stack } from "../data/stack";
import { buildAnswers, buildNarration } from "./companion";
import { findTech, techMentioned } from "./tags";

const content = { profile, projects, experience, stack, education, certifications };

describe("buildNarration", () => {
  const narration = buildNarration(content);

  it("has a line for every section, built from the real data", () => {
    for (const line of Object.values(narration)) expect(line.length).toBeGreaterThan(20);
    expect(narration.experience).toContain(experience[0].company);
    expect(narration.experience).toContain(experience[0].roles[0].period);
    expect(narration.projects).toContain(`${projects.length} projects`);
    expect(narration.stack).toContain(`${stack.reduce((n, g) => n + g.items.length, 0)} technologies`);
    expect(narration.certifications).toContain(`${certifications.length} certifications`);
    expect(narration.contact).toContain(profile.email);
  });
});

describe("buildAnswers", () => {
  it("answers every question from the CV", () => {
    const answers = buildAnswers(content);
    expect(answers.length).toBeGreaterThanOrEqual(5);
    const byQuestion = new Map(answers.map((a) => [a.question, a.answer]));
    for (const job of experience) expect(byQuestion.get("Where have you worked?")).toContain(job.company);
    expect(byQuestion.get("Are you available?")).toContain(profile.location);
    expect(byQuestion.get("How do I contact you?")).toContain(profile.email);
  });
});

describe("techMentioned", () => {
  it("finds the stack items a text mentions, whole words only", () => {
    const names = techMentioned(["Built CI/CD with GitHub Actions and Docker images on PostgreSQL/Supabase."], stack).map((t) => t.name);
    expect(names).toEqual(expect.arrayContaining(["GitHub Actions", "Docker", "PostgreSQL", "Supabase"]));
    expect(names).not.toContain("Git"); // too generic to detect
  });

  it("matches either side of a combined name and ignores lookalikes", () => {
    expect(techMentioned(["C# integrations"], stack).map((t) => t.name)).toContain("C# / .NET");
    expect(techMentioned(["Reactive programming"], stack).map((t) => t.name)).not.toContain("React");
  });

  it("finds a technology by name to reuse its logo", () => {
    expect(findTech("docker", stack)?.logo).toBeTruthy();
    expect(findTech("Not a tool", stack)).toBeUndefined();
  });
});
