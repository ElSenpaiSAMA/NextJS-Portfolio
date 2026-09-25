import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { certifications, education, experience } from "./experience";
import { profile } from "./profile";
import { projects } from "./projects";
import { stack } from "./stack";

/** Content integrity: catches broken data and missing assets before they reach the page. */

const PUBLIC_DIR = join(process.cwd(), "public");

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function publicAssetExists(path: string): boolean {
  return path.startsWith("/") && existsSync(join(PUBLIC_DIR, path));
}

describe("profile", () => {
  it("has valid contact links", () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    for (const url of [profile.githubUrl, profile.linkedinUrl, profile.repoUrl, profile.ciWorkflowUrl]) {
      expect(isHttpsUrl(url), url).toBe(true);
    }
    expect(profile.formspreeId).toMatch(/^[a-z0-9]+$/i);
    // tel: links need E.164 without spaces; the display number must match it digit for digit.
    expect(profile.phoneHref).toMatch(/^\+\d{8,15}$/);
    expect(profile.phone.replace(/\s/g, "")).toBe(profile.phoneHref);
  });

  it("links the right LinkedIn profile (accented slug; the unaccented one is another person)", () => {
    expect(profile.linkedinUrl).toBe("https://www.linkedin.com/in/matías-speroni");
  });

  it("serves the CV as a PDF from /public", () => {
    expect(profile.cvUrl).toMatch(/^\/.+\.pdf$/);
  });

  it("references assets that exist in /public", () => {
    expect(publicAssetExists(profile.avatar), profile.avatar).toBe(true);
    if (profile.cvUrl !== null) expect(publicAssetExists(profile.cvUrl), profile.cvUrl).toBe(true);
  });

  it("keeps the about section and facts short", () => {
    expect(profile.about.length).toBeGreaterThanOrEqual(1);
    expect(profile.about.length).toBeLessThanOrEqual(3);
    expect(profile.facts.length).toBeLessThanOrEqual(4);
  });
});

describe("projects", () => {
  it("have unique, anchor-safe slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("each have an existing image, tech list and a valid link", () => {
    for (const p of projects) {
      expect(publicAssetExists(p.image), `${p.slug} image ${p.image}`).toBe(true);
      expect(p.description.length, p.slug).toBeGreaterThan(20);
      expect(p.tech.length, p.slug).toBeGreaterThan(0);
      expect(p.github ?? p.siteLink, `${p.slug} needs a repo or live link`).toBeTruthy();
      for (const url of [p.github, p.siteLink].filter(Boolean) as string[]) {
        expect(isHttpsUrl(url), url).toBe(true);
      }
    }
  });
});

describe("experience, education and certifications", () => {
  it("are complete", () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const item of experience) {
      expect(item.roles.length, item.company).toBeGreaterThan(0);
      expect(item.highlights.length, item.company).toBeGreaterThan(0);
      for (const role of item.roles) expect(role.period, `${item.company} ${role.title}`).toMatch(/\d{4}/);
    }
    for (const item of [...education, ...certifications]) {
      expect(Object.values(item).every((v) => v.length > 0)).toBe(true);
    }
  });
});

describe("stack", () => {
  it("has unique groups, no duplicate items per group and existing logos", () => {
    const ids = stack.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const group of stack) {
      const names = group.items.map((i) => i.name);
      expect(new Set(names).size, group.id).toBe(names.length);
      for (const item of group.items) {
        if (item.logo) expect(publicAssetExists(item.logo), `${item.name} logo ${item.logo}`).toBe(true);
      }
    }
  });
});
