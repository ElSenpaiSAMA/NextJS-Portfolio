import { expect, test } from "./fixtures";

const FORMSPREE = "https://formspree.io/f/**";

async function fillValid(page: import("@playwright/test").Page) {
  await page.getByLabel("Name", { exact: true }).fill("Recruiter");
  await page.getByLabel("Email", { exact: true }).fill("recruiter@example.com");
  await page.getByLabel("Message", { exact: true }).fill("We have a junior platform role open.");
}

test.describe("contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("email, phone and LinkedIn are visible without using the form", async ({ page }) => {
    await expect(page.getByRole("link", { name: "mnicolas03sp@gmail.com" })).toHaveAttribute("href", "mailto:mnicolas03sp@gmail.com");
    await expect(page.getByRole("link", { name: /\+34 689 51 82 35/ })).toHaveAttribute("href", "tel:+34689518235");
    const linkedin = page.getByRole("link", { name: /linkedin\.com\/in\/matías-speroni/ });
    await expect(linkedin).toBeVisible();
    // The browser percent-encodes the accent: í → %C3%AD.
    expect(await linkedin.evaluate((a: HTMLAnchorElement) => a.href)).toBe("https://www.linkedin.com/in/mat%C3%ADas-speroni");
  });

  test("blocks invalid input without calling Formspree", async ({ page }) => {
    let called = false;
    await page.route(FORMSPREE, (route) => {
      called = true;
      return route.fulfill({ status: 200, body: "{}" });
    });

    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute("aria-invalid", "true");
    expect(called).toBe(false);
  });

  test("submits and shows the success state", async ({ page }) => {
    await page.route(FORMSPREE, (route) => route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
    await fillValid(page);
    await page.getByRole("button", { name: "Send message" }).click();

    // Scoped: Next.js also renders a route announcer with a live role.
    await expect(page.locator("main").getByRole("status")).toContainText("Message sent.");
  });

  test("shows an error and ships a log when Formspree fails", async ({ page, errors }) => {
    errors.allowErrors();
    await page.route(FORMSPREE, (route) => route.fulfill({ status: 500, body: "boom" }));
    const logRequest = page.waitForRequest((req) => req.url().endsWith("/api/log") && req.method() === "POST");

    await fillValid(page);
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.locator("main").getByRole("alert")).toContainText("could not be sent");
    const log = await logRequest;
    expect(log.postDataJSON()).toMatchObject({ level: "error", event: "contact.failure", context: { status: 500 } });
  });
});
