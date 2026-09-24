import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";
import { ALL_ROUTES } from "./routes";

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`accessibility (${colorScheme})`, () => {
    for (const route of ALL_ROUTES) {
      test(`${route} has no WCAG 2.1 AA violations`, async ({ page }) => {
        await page.emulateMedia({ colorScheme });
        await page.goto(route);
        await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme);

        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
        const summary = results.violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
        expect(summary).toEqual([]);
      });
    }
  });
}
