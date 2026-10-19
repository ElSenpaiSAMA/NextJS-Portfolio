import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

// Audited once the intro, the scroll reveals and the hero deploy have settled:
// mid-animation text reports a transient low contrast.
for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`has no WCAG 2.1 AA violations (motion: ${reducedMotion})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/");
    await expect(page.getByTestId("intro")).toBeHidden({ timeout: 5_000 });

    // Walk the page like a reader so every scroll animation finishes.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= height; y += 500) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(40);
    }
    await page.waitForTimeout(1_200);
    // …and the hero deploy has finished its run (mid-run states are transient).
    await expect(page.getByTestId("deploy").getByRole("status")).toContainText("Deployed to production", { timeout: 15_000 });
    await page.waitForTimeout(600);

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const summary = results.violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
    expect(summary).toEqual([]);
  });
}
