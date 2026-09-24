import { describe, expect, it } from "vitest";
import { education, experience } from "./experience";
import { profile } from "./profile";
import { findProject, projects } from "./projects";
import { roadmap } from "./roadmap";
import { skillCategories } from "./skills";

/** Content integrity: catches broken data before it reaches the page. */

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

describe("profile", () => {
  it("has valid contact links", () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    for (const url of [profile.githubUrl, profile.linkedinUrl, profile.repoUrl, profile.ciWorkflowUrl, profile.ciBadgeUrl]) {
      expect(isHttpsUrl(url), url).toBe(true);
    }
    expect(profile.formspreeId).toMatch(/^[a-z0-9]+$/i);
  });

  it("keeps the about section short (2–3 lines)", () => {
    expect(profile.about.length).toBeGreaterThanOrEqual(1);
    expect(profile.about.length).toBeLessThanOrEqual(3);
  });

  it("points the CV at /public when set", () => {
    if (profile.cvUrl !== null) expect(profile.cvUrl).toMatch(/^\/.+\.pdf$/);
  });
});

describe("projects", () => {
  it("have unique, URL-safe slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("findProject resolves known slugs and rejects unknown ones", () => {
    expect(findProject(projects[0].slug)).toBe(projects[0]);
    expect(findProject("does-not-exist")).toBeUndefined();
  });

  it("are complete case studies with valid links", () => {
    for (const p of projects) {
      expect(p.problem && p.solution && p.deployment && p.outcome, p.slug).toBeTruthy();
      expect(p.architecture.length, `${p.slug} architecture`).toBeGreaterThanOrEqual(2);
      expect(p.stack.length, `${p.slug} stack`).toBeGreaterThan(0);
      expect(p.links.repo ?? p.links.demo, `${p.slug} needs a repo or demo`).toBeTruthy();
      for (const url of [p.links.repo, p.links.demo].filter(Boolean) as string[]) {
        expect(isHttpsUrl(url), url).toBe(true);
      }
    }
  });

  it("has at least one featured case study", () => {
    expect(projects.some((p) => p.featured)).toBe(true);
  });

  it("keeps the strongest DevOps evidence featured", () => {
    const featured = projects.filter((p) => p.featured).map((p) => p.slug);
    expect(featured).toContain("spotify-pipeline");
    expect(featured).toContain("portfolio");
  });
});

describe("skills", () => {
  it("have unique category ids and unique names per category", () => {
    const ids = skillCategories.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const c of skillCategories) {
      const names = c.skills.map((s) => s.name);
      expect(new Set(names).size, c.id).toBe(names.length);
      for (const s of c.skills) expect(s.context.length, s.name).toBeGreaterThan(0);
    }
  });
});

describe("roadmap, experience and education", () => {
  it("are non-empty and well formed", () => {
    expect(roadmap.length).toBeGreaterThanOrEqual(2);
    for (const r of roadmap) expect(r.deliverables.length, r.title).toBeGreaterThan(0);
    for (const e of experience) expect(e.points.length, e.organization).toBeGreaterThan(0);
    expect(education.length).toBeGreaterThan(0);
  });
});
