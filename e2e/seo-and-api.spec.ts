import { expect, test } from "./fixtures";

test.describe("SEO & metadata", () => {
  test("home exposes title, description, Open Graph and JSON-LD", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Matias Speroni — Backend & DevOps Engineer");

    const meta = (selector: string) => page.locator(selector).first().getAttribute("content");
    expect(await meta('meta[name="description"]')).toBeTruthy();
    expect(await meta('meta[property="og:title"]')).toContain("Backend & DevOps");
    expect(await meta('meta[property="og:image"]')).toContain("/opengraph-image");
    expect(await meta('meta[name="twitter:card"]')).toBe("summary_large_image");
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  });

  test("has a canonical URL and a sitemap entry for the homepage", async ({ page, request }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("<loc>");
  });

  test("serves robots.txt, favicon and OG image", async ({ request }) => {
    for (const [path, type] of [
      ["/robots.txt", "text/plain"],
      ["/sitemap.xml", "xml"],
      ["/icon.svg", "image/svg+xml"],
      ["/opengraph-image", "image/png"],
      ["/CV_Matias_Speroni_DO.pdf", "application/pdf"],
    ] as const) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      expect(res.headers()["content-type"], path).toContain(type);
    }
  });

  test("sends baseline security headers", async ({ request }) => {
    const headers = (await request.get("/")).headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-powered-by"]).toBeUndefined();
  });
});

test.describe("/api/log", () => {
  test("accepts valid entries and rejects invalid ones", async ({ request }) => {
    const ok = await request.post("/api/log", { data: { level: "warn", event: "e2e.check", path: "/" } });
    expect(ok.status()).toBe(204);

    const bad = await request.post("/api/log", { data: { level: "info", event: "Not Valid" } });
    expect(bad.status()).toBe(400);
  });
});
