import { expect, test } from "./fixtures";

const SECTIONS = ["projects", "experience", "stack", "about", "contact"];

test.describe("home page", () => {
  test("loads with who I am, every section and no errors", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Matias Speroni");
    await expect(page.getByText("Backend & DevOps Engineer").first()).toBeVisible();
    for (const id of SECTIONS) await expect(page.locator(`section#${id}`)).toBeAttached();
    await expect(page.getByTestId("build-info")).toBeVisible();
  });

  test("every image loads (projects, portrait, stack logos)", async ({ page }) => {
    await page.goto("/");
    // Lazy images only load near the viewport, so walk the page in small steps.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= height; y += 400) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(60);
    }

    // Poll instead of networkidle: the first request for a large image waits on the
    // optimizer, which can outlast "idle". A truly broken image never completes.
    await expect
      .poll(
        () =>
          page.evaluate(() =>
            [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.currentSrc || img.src),
          ),
        { timeout: 15_000 },
      )
      .toEqual([]);
    expect(await page.locator("#projects img").count()).toBe(6);
  });

  test("the hero terminal finishes its pipeline run", async ({ page }) => {
    await page.goto("/");
    // Pure CSS timeline: the last stage flips to its check mark, then the summary line shows.
    await expect(page.getByText("all checks passed")).toBeVisible({ timeout: 10_000 });
  });

  test("the hero cluster renders: WebGL on desktop, SVG on phones", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) {
      await expect(page.getByTestId("cluster-svg")).toBeVisible();
      await expect(page.getByTestId("hero-scene").locator("canvas")).toHaveCount(0);
    } else {
      // Mounted on idle, as its own chunk.
      await expect(page.getByTestId("hero-scene").locator("canvas")).toBeVisible({ timeout: 10_000 });
    }
  });

  test("scroll reveals end fully visible", async ({ page }) => {
    await page.goto("/");
    await page.locator("section#contact").scrollIntoViewIfNeeded();
    const card = page.locator("#contact [data-reveal]").first();
    await expect.poll(() => card.evaluate((el) => getComputedStyle(el).opacity), { timeout: 5_000 }).toBe("1");
  });

  test("has no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("every in-page anchor has a target", async ({ page }) => {
    await page.goto("/");
    const missing = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
        .map((a) => a.getAttribute("href")!.slice(1))
        .filter((id) => !document.getElementById(id)),
    );
    expect(missing).toEqual([]);
  });

  test("external links open safely in a new tab", async ({ page }) => {
    await page.goto("/");
    const unsafe = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')]
        .filter((a) => a.target !== "_blank" || !a.rel.includes("noopener"))
        .map((a) => a.href),
    );
    expect(unsafe).toEqual([]);
  });

  test("unknown routes return a 404 page", async ({ page, errors }) => {
    // The 404 response itself is the expected outcome here.
    errors.allowErrors();
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "This page does not exist." })).toBeVisible();
  });
});

test.describe("navigation", () => {
  test("header links scroll to each section", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Sections" });
    for (const id of SECTIONS) {
      const link = nav.locator(`a[href="#${id}"]`);
      // Links hidden on narrow phones are still reachable by scrolling; skip them here.
      if (!(await link.isVisible())) continue;
      await link.click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`section#${id}`)).toBeInViewport();
    }
  });

  test("hero 'View work' jumps to projects", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /View work/ }).click();
    await expect(page.locator("section#projects")).toBeInViewport();
  });

  test("skip link is the first focusable element", async ({ page, isMobile }) => {
    test.skip(isMobile, "Keyboard navigation");
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });
});
