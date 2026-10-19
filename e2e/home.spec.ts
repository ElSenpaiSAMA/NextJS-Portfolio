import { expect, test } from "./fixtures";

const SECTIONS = ["experience", "projects", "stack", "certifications", "about"];

test.describe("home page", () => {
  test("loads with who I am, every section and no errors", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Matias Speroni");
    await expect(page.getByText("Backend & DevOps Engineer").first()).toBeVisible();
    for (const id of [...SECTIONS, "contact"]) await expect(page.locator(`section#${id}`)).toBeAttached();
    await expect(page.getByTestId("build-info")).toBeVisible();
  });

  test("every image loads (projects, portrait, stack logos)", async ({ page }) => {
    await page.goto("/");
    // Lazy images only load near the viewport, so walk the page in small steps
    // (on desktop the projects run sideways while the page scrolls through them).
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= height; y += 300) {
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
    expect(await page.locator(`#projects img[alt^="Screenshot"]`).count()).toBe(6);
  });

  test("the companion narrates the section in view (desktop)", async ({ page, isMobile }) => {
    test.skip(isMobile, "The companion is a sheet on phones");
    await page.goto("/");
    const companion = page.getByTestId("companion");
    await page.locator("section#projects").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 200));
    await expect(companion.getByText(/viewing:/)).toContainText("02 Projects");
    await expect(companion.locator("[aria-live]").first()).toContainText("projects here");
  });

  test("ask the companion and deploy from it", async ({ page, isMobile }) => {
    await page.goto("/");
    // Phones open the companion as a sheet; desktop has it beside the content.
    const companion = isMobile ? page.getByRole("dialog") : page.getByTestId("companion");
    if (isMobile) await page.getByRole("button", { name: /Ask Matias/ }).click();

    await companion.getByRole("tab", { name: "Ask" }).click();
    await companion.getByRole("button", { name: "Where have you worked?" }).click();
    await expect(companion.getByTestId("companion-answer")).toContainText("Imagine Group", { timeout: 10_000 });

    await companion.getByRole("tab", { name: "Deploy" }).click();
    const deploy = companion.getByTestId("deploy");
    await expect(deploy.getByRole("status")).toContainText(/Deployed to production in \d+\.\d s/, { timeout: 15_000 });
    await deploy.getByRole("button", { name: "Redeploy" }).click();
    await expect(deploy.getByRole("button", { name: "Deploying…" })).toBeDisabled();
  });

  test("the stack drops into the physics box", async ({ page }) => {
    await page.goto("/");
    const box = page.getByTestId("stack-playground");
    await box.scrollIntoViewIfNeeded();
    // Once the engine runs, every block is positioned by a transform.
    await expect.poll(() => box.locator("span[style*='translate']").count(), { timeout: 10_000 }).toBeGreaterThan(10);
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
