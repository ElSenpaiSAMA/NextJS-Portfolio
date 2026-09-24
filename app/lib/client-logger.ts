import {
  CLIENT_SHIPPABLE_LEVELS,
  serializeError,
  type ClientLogPayload,
  type ClientShippableLevel,
  type LogContext,
  type LogLevel,
} from "./log-schema";

/**
 * Browser logger. Every entry prints to the console in development; only
 * warn/error are shipped to /api/log (and from there to the server logs).
 * A per-page cap stops an error loop from flooding the endpoint.
 */

export const LOG_ENDPOINT = "/api/log";
export const MAX_SHIPPED_PER_PAGE = 20;

let shippedCount = 0;

/** Test-only: reset the per-page shipping budget. */
export function resetClientLoggerBudget(): void {
  shippedCount = 0;
}

function isShippable(level: LogLevel): level is ClientShippableLevel {
  return (CLIENT_SHIPPABLE_LEVELS as readonly string[]).includes(level);
}

function ship(payload: ClientLogPayload): void {
  if (shippedCount >= MAX_SHIPPED_PER_PAGE) return;
  shippedCount += 1;

  const body = JSON.stringify(payload);
  try {
    // sendBeacon survives page unloads; fall back to a keepalive fetch.
    const sent =
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon(LOG_ENDPOINT, new Blob([body], { type: "application/json" }));
    if (!sent) {
      void fetch(LOG_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        /* Logging must never break the page. */
      });
    }
  } catch {
    /* Logging must never break the page. */
  }
}

function log(level: LogLevel, event: string, context?: LogContext): void {
  if (process.env.NODE_ENV !== "production") {
    // Dev-only console output; production builds stay console-clean so the
    // E2E "no console errors" check stays meaningful.
    console[level === "debug" ? "debug" : level](`[${event}]`, context ?? "");
  }
  if (isShippable(level)) {
    ship({
      level,
      event,
      ...(context ? { context } : {}),
      ...(typeof window !== "undefined" ? { path: window.location.pathname } : {}),
    });
  }
}

export const clientLogger = {
  debug: (event: string, context?: LogContext) => log("debug", event, context),
  info: (event: string, context?: LogContext) => log("info", event, context),
  warn: (event: string, context?: LogContext) => log("warn", event, context),
  error: (event: string, context?: LogContext) => log("error", event, context),
};

/** Convenience for catch blocks and global handlers. */
export function reportClientError(event: string, error: unknown, context?: LogContext): void {
  clientLogger.error(event, { ...context, error: serializeError(error) });
}
