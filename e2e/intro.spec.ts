import { expect, test } from "./fixtures";

test.describe("welcome intro", () => {
  test("plays on the first visit, then slides away", async ({ page }) => {
    await page.goto("/");
    const intro = page.getByTestId("intro");

    await expect(intro).toBeVisible();
    await expect(intro).toContainText("Welcome to my portfolio");
    // Exit animation ends at ~2.6s and leaves it visibility:hidden.
    await expect(intro).toBeHidden({ timeout: 5_000 });
  });

  test("does not replay on reload in the same session", async ({ page }) => {
    await page.goto("/");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-intro", "seen");
    await expect(page.getByTestId("intro")).toBeHidden();
  });

  test("never blocks clicks on the page underneath", async ({ page }) => {
    await page.goto("/");
    // Clicked immediately, while the intro is still on screen.
    await page.getByRole("link", { name: /View work/ }).click({ timeout: 1_000 });
    await expect(page).toHaveURL(/#projects$/);
  });

  test("is skipped for visitors who prefer reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByTestId("intro")).toBeHidden();
    await context.close();
  });
});
