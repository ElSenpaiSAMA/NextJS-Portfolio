import { reportClientError, clientLogger } from "./app/lib/client-logger";

/**
 * Runs before hydration: catches everything React error boundaries don't —
 * uncaught errors, unhandled promise rejections and failed resource loads.
 */

window.addEventListener("error", (event) => {
  reportClientError("client.unhandled_error", event.error ?? event.message, {
    source: event.filename,
    line: event.lineno,
  });
});

window.addEventListener("unhandledrejection", (event) => {
  reportClientError("client.unhandled_rejection", event.reason);
});

// Resource errors (img/script/link) don't bubble, so listen in the capture phase.
window.addEventListener(
  "error",
  (event) => {
    const target = event.target;
    if (target instanceof HTMLImageElement || target instanceof HTMLScriptElement) {
      clientLogger.error("client.resource_error", { tag: target.tagName.toLowerCase(), src: target.src });
    } else if (target instanceof HTMLLinkElement) {
      clientLogger.error("client.resource_error", { tag: "link", src: target.href });
    }
  },
  true,
);
