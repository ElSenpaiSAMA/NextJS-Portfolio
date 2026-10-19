import { describe, expect, it } from "vitest";
import { STAGES } from "../data/pipeline";
import { certifications, experience } from "../data/experience";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { stack } from "../data/stack";
import { stageLogs } from "./stage-logs";
import { findTech, techMentioned } from "./tags";

describe("stageLogs", () => {
  const logs = stageLogs({ profile, stack, projects, experience, certifications });
  const text = (id: keyof typeof logs) => logs[id].map((l) => l.text).join(" ");

  it("has a log for every stage, starting with a command and ending with a result", () => {
    for (const stage of STAGES) {
      const lines = logs[stage.id];
      expect(lines[0].kind, stage.id).toBe("cmd");
      expect(lines.at(-1)!.kind, stage.id).toBe("ok");
    }
  });

  it("prints counts computed from the real content", () => {
    const technologies = stack.reduce((n, g) => n + g.items.length, 0);
    expect(text("stack")).toContain(`${technologies} technologies`);
    expect(text("projects")).toContain(`${projects.length} projects`);
    expect(text("experience")).toContain(`${experience.length} companies`);
    expect(text("experience")).toContain(`${certifications.length} certifications`);
    expect(text("experience")).toContain("since 11/2024");
    expect(text("top")).toContain(profile.name);
  });
});

describe("techMentioned", () => {
  it("finds the stack items a text mentions, whole words only", () => {
    const names = techMentioned(["Built CI/CD with GitHub Actions and Docker images on PostgreSQL/Supabase."], stack).map((t) => t.name);
    expect(names).toEqual(expect.arrayContaining(["GitHub Actions", "Docker", "PostgreSQL", "Supabase"]));
    expect(names).not.toContain("Git");
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
