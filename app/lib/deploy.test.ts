import { describe, expect, it } from "vitest";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import { PIPELINE } from "../data/ship";
import { stack } from "../data/stack";
import { buildDeployScript, scriptDuration } from "./deploy";

describe("buildDeployScript", () => {
  const steps = buildDeployScript(PIPELINE.stages, { projects, stack, experience });

  it("runs every real CI stage, in order", () => {
    expect(steps.map((s) => s.stage)).toEqual([...PIPELINE.stages]);
  });

  it("logs counts computed from the real content", () => {
    const build = steps.find((s) => s.stage === "build")!;
    const technologies = stack.reduce((n, g) => n + g.items.length, 0);
    expect(build.log.join(" ")).toContain(`${projects.length} projects`);
    expect(build.log.join(" ")).toContain(`(${technologies} technologies)`);
    expect(build.log.join(" ")).toContain(`${experience.length} companies`);
  });

  it("is deterministic and short enough to watch", () => {
    expect(buildDeployScript(PIPELINE.stages, { projects, stack, experience })).toEqual(steps);
    expect(scriptDuration(steps)).toBeGreaterThan(2_000);
    expect(scriptDuration(steps)).toBeLessThan(6_000);
  });
});
