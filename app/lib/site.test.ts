import { afterEach, describe, expect, it, vi } from "vitest";
import { getBuildInfo, isActivePath, NAV_ITEMS, projectHref } from "./site";

describe("isActivePath", () => {
  it("matches the page itself and nested pages only", () => {
    expect(isActivePath("/projects", "/projects")).toBe(true);
    expect(isActivePath("/projects/portfolio", "/projects")).toBe(true);
    expect(isActivePath("/projectsx", "/projects")).toBe(false);
    expect(isActivePath("/", "/projects")).toBe(false);
  });
});

describe("routes", () => {
  it("nav hrefs are unique absolute paths", () => {
    const hrefs = NAV_ITEMS.map((n) => n.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of hrefs) expect(href).toMatch(/^\/[a-z-]+$/);
  });

  it("builds project URLs under /projects", () => {
    expect(projectHref("spotify-pipeline")).toBe("/projects/spotify-pipeline");
  });
});

describe("getBuildInfo", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("reports a local build without a commit", () => {
    // undefined removes the variable, mirroring a local shell (and CI's GITHUB_SHA).
    vi.stubEnv("VERCEL_GIT_COMMIT_SHA", undefined);
    vi.stubEnv("GITHUB_SHA", undefined);
    vi.stubEnv("VERCEL_ENV", undefined);
    expect(getBuildInfo("https://github.com/x/y")).toEqual({ commit: null, commitUrl: null, environment: "local" });
  });

  it("uses the Vercel commit and environment when deployed", () => {
    vi.stubEnv("VERCEL_GIT_COMMIT_SHA", "abcdef1234567890");
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(getBuildInfo("https://github.com/x/y")).toEqual({
      commit: "abcdef1",
      commitUrl: "https://github.com/x/y/commit/abcdef1234567890",
      environment: "preview",
    });
  });
});
