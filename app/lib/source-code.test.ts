import { describe, expect, it } from "vitest";
import { profile } from "../data/profile";
import { stack } from "../data/stack";
import { buildProfileSource, lineText, toKey } from "./source-code";

describe("buildProfileSource", () => {
  const lines = buildProfileSource(profile, stack);
  const text = lines.map(lineText).join("\n");

  it("writes the real profile and every stack item, nothing else", () => {
    expect(text).toContain(JSON.stringify(profile.name));
    expect(text).toContain(JSON.stringify(profile.role));
    for (const group of stack) {
      expect(text).toContain(`${toKey(group.title)}: [`);
      for (const item of group.items) expect(text).toContain(JSON.stringify(item.name));
    }
  });

  it("produces balanced braces and brackets (it reads as valid code)", () => {
    const count = (s: string, c: string) => s.split(c).length - 1;
    const code = lines.filter((l) => l[0]?.kind !== "comment").map(lineText).join("\n");
    expect(count(code, "{")).toBe(count(code, "}"));
    expect(count(code, "[")).toBe(count(code, "]"));
  });
});

describe("toKey", () => {
  it("turns titles into camelCase identifiers", () => {
    expect(toKey("CI/CD & Automation")).toBe("ciCdAutomation");
    expect(toKey("AI Agents & Data")).toBe("aiAgentsData");
    expect(toKey("Backend")).toBe("backend");
  });
});
