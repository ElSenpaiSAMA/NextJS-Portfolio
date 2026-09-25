import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

for (const colorScheme of ["light", "dark"] as const) {
  test(`has no WCAG 2.1 AA violations (${colorScheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme);
    // Audit the settled page: mid-fade intro text reports a transient low contrast.
    await expect(page.getByTestId("intro")).toBeHidden({ timeout: 5_000 });

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const summary = results.violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
    expect(summary).toEqual([]);
  });
}
