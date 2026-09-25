import { afterEach, describe, expect, it, vi } from "vitest";
import { getBuildInfo, NAV_ITEMS } from "./site";

describe("NAV_ITEMS", () => {
  it("has unique, anchor-safe section ids", () => {
    const ids = NAV_ITEMS.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z-]+$/);
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
