import { test as base, expect, type ConsoleMessage, type Request } from "@playwright/test";

/**
 * Shared fixture: every E2E test fails if the page logs a console error,
 * throws an uncaught exception, gets a 4xx/5xx from its own origin, or
 * ships an error to /api/log — unless the test opts in via `allowErrors`.
 * This is the "no errors anywhere, on any action" guard.
 */

interface ErrorMonitor {
  consoleErrors: string[];
  pageErrors: string[];
  failedRequests: string[];
  shippedLogs: unknown[];
  /** Call in tests that deliberately trigger errors. */
  allowErrors: () => void;
}

export const test = base.extend<{ errors: ErrorMonitor }>({
  errors: [
    async ({ page, baseURL }, use) => {
      const monitor: ErrorMonitor = {
        consoleErrors: [],
        pageErrors: [],
        failedRequests: [],
        shippedLogs: [],
        allowErrors: () => {
          allowed = true;
        },
      };
      let allowed = false;
      const origin = new URL(baseURL!).origin;

      page.on("console", (msg: ConsoleMessage) => {
        if (msg.type() === "error") monitor.consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err) => monitor.pageErrors.push(err.message));
      page.on("response", (res) => {
        if (res.url().startsWith(origin) && res.status() >= 400) {
          monitor.failedRequests.push(`${res.status()} ${res.url()}`);
        }
      });
      page.on("requestfailed", (req: Request) => {
        if (req.url().startsWith(origin)) monitor.failedRequests.push(`FAILED ${req.url()} ${req.failure()?.errorText}`);
      });
      page.on("request", (req) => {
        if (req.url() === `${origin}/api/log` && req.method() === "POST") {
          monitor.shippedLogs.push(req.postDataJSON());
        }
      });

      await use(monitor);

      if (!allowed) {
        expect.soft(monitor.pageErrors, "uncaught exceptions").toEqual([]);
        expect.soft(monitor.consoleErrors, "console errors").toEqual([]);
        expect.soft(monitor.failedRequests, "failed same-origin requests").toEqual([]);
        expect.soft(monitor.shippedLogs, "errors shipped to /api/log").toEqual([]);
      }
    },
    { auto: true },
  ],
});

export { expect };
