import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

// Single dark theme. Audited after the intro settles (mid-fade text reports a transient low contrast).
for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`has no WCAG 2.1 AA violations (motion: ${reducedMotion})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/");
    await expect(page.getByTestId("intro")).toBeHidden({ timeout: 5_000 });

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const summary = results.violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
    expect(summary).toEqual([]);
  });
}
