import { expect, test } from "./fixtures";
import { ALL_ROUTES } from "./routes";

test.describe("SEO & metadata", () => {
  test("home exposes title, description, Open Graph and JSON-LD", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Matias Speroni — Junior Platform / DevOps Engineer");

    const meta = (selector: string) => page.locator(selector).first().getAttribute("content");
    expect(await meta('meta[name="description"]')).toBeTruthy();
    expect(await meta('meta[property="og:title"]')).toContain("DevOps");
    expect(await meta('meta[property="og:image"]')).toContain("/opengraph-image");
    expect(await meta('meta[name="twitter:card"]')).toBe("summary_large_image");
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  });

  test("every page has a unique title and its own canonical URL", async ({ page }) => {
    const titles = new Set<string>();
    for (const route of ALL_ROUTES) {
      await page.goto(route);
      titles.add(await page.title());
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(new URL(canonical!).pathname.replace(/\/$/, "") || "/", route).toBe(route);
    }
    expect(titles.size).toBe(ALL_ROUTES.length);
  });

  test("sitemap lists every page", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const route of ALL_ROUTES.filter((r) => r !== "/")) {
      expect(xml, route).toContain(`${route}</loc>`);
    }
  });

  test("serves robots.txt, favicon and OG image", async ({ request }) => {
    for (const [path, type] of [
      ["/robots.txt", "text/plain"],
      ["/sitemap.xml", "xml"],
      ["/icon.svg", "image/svg+xml"],
      ["/opengraph-image", "image/png"],
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
