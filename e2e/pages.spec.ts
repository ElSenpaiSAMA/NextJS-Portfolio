import { expect, test } from "./fixtures";
import { ALL_ROUTES } from "./routes";

test.describe("every page", () => {
  for (const route of ALL_ROUTES) {
    test(`${route} loads cleanly`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();
      await expect(page.getByTestId("build-info")).toBeVisible();

      // Nothing wider than the viewport (mobile project runs at 412px).
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);

      // External links open safely in a new tab.
      const unsafe = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')]
          .filter((a) => a.target !== "_blank" || !a.rel.includes("noopener"))
          .map((a) => a.href),
      );
      expect(unsafe).toEqual([]);
    });
  }
});

test("no internal link on the site is broken", async ({ page, request, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const targets = new Set<string>();

  for (const route of ALL_ROUTES) {
    await page.goto(route);
    const hrefs = await page.evaluate(() => [...document.querySelectorAll<HTMLAnchorElement>("a[href]")].map((a) => a.href));
    for (const href of hrefs) {
      const url = new URL(href);
      if (url.origin === origin) targets.add(url.pathname);
    }
  }

  const broken: string[] = [];
  for (const path of targets) {
    const res = await request.get(path);
    if (res.status() !== 200) broken.push(`${res.status()} ${path}`);
  }
  expect(broken).toEqual([]);
});

test.describe("navigation", () => {
  test("header links reach each page and mark it as current", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });

    for (const [label, path] of [
      ["Work", "/projects"],
      ["Skills", "/skills"],
      ["About", "/about"],
      ["Contact", "/contact"],
    ] as const) {
      await nav.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(path);
      await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
    }

    await page.getByRole("link", { name: "Matias Speroni" }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("a recruiter can go from home to a case study and back", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Spotify Pipeline/ }).click();
    await expect(page).toHaveURL("/projects/spotify-pipeline");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Spotify Pipeline");
    await expect(page.getByRole("heading", { name: "Architecture" })).toBeVisible();

    await page.getByRole("link", { name: "All projects" }).click();
    await expect(page).toHaveURL("/projects");
  });

  test("skip link is the first focusable element", async ({ page, isMobile }) => {
    test.skip(isMobile, "Keyboard navigation");
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });
});

test.describe("not found", () => {
  for (const path of ["/does-not-exist", "/projects/does-not-exist"]) {
    test(`${path} returns a 404 page`, async ({ page, errors }) => {
      // The 404 response itself is the expected outcome here.
      errors.allowErrors();
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { name: "This page does not exist." })).toBeVisible();
    });
  }
});
