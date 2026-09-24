import { expect, test } from "./fixtures";

const FORMSPREE = "https://formspree.io/f/**";

test.describe("contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("email and LinkedIn are visible without using the form", async ({ page }) => {
    const contact = page.locator("#contact");
    await expect(contact.getByRole("link", { name: "mnicolas03sp@gmail.com" })).toHaveAttribute("href", "mailto:mnicolas03sp@gmail.com");
    await expect(contact.getByRole("link", { name: /linkedin\.com/ })).toBeVisible();
  });

  test("blocks invalid input without calling Formspree", async ({ page }) => {
    let called = false;
    await page.route(FORMSPREE, (route) => {
      called = true;
      return route.fulfill({ status: 200, body: "{}" });
    });

    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByLabel("Email")).toHaveAttribute("aria-invalid", "true");
    expect(called).toBe(false);
  });

  test("submits and shows the success state", async ({ page }) => {
    await page.route(FORMSPREE, (route) => route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));

    await page.getByLabel("Name").fill("Recruiter");
    await page.getByLabel("Email").fill("recruiter@example.com");
    await page.getByLabel("Message").fill("We have a junior platform role open.");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.locator("#contact").getByRole("status")).toContainText("Message sent.");
  });

  test("shows an error and ships a log when Formspree fails", async ({ page, errors }) => {
    errors.allowErrors();
    await page.route(FORMSPREE, (route) => route.fulfill({ status: 500, body: "boom" }));
    const logRequest = page.waitForRequest((req) => req.url().endsWith("/api/log") && req.method() === "POST");

    await page.getByLabel("Name").fill("Recruiter");
    await page.getByLabel("Email").fill("recruiter@example.com");
    await page.getByLabel("Message").fill("We have a junior platform role open.");
    await page.getByRole("button", { name: "Send message" }).click();

    // Scoped: Next.js also renders an (empty) role="alert" route announcer.
    await expect(page.locator("#contact").getByRole("alert")).toContainText("could not be sent");
    const log = await logRequest;
    expect(log.postDataJSON()).toMatchObject({ level: "error", event: "contact.failure", context: { status: 500 } });
  });
});
