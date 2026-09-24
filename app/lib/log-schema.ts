/**
 * Shared log contract between the browser (client-logger), the ingestion
 * route (app/api/log) and the server logger. Pure — no runtime-specific APIs.
 */

export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

/** Levels the browser is allowed to ship to /api/log. */
export const CLIENT_SHIPPABLE_LEVELS = ["warn", "error"] as const;
export type ClientShippableLevel = (typeof CLIENT_SHIPPABLE_LEVELS)[number];

export type LogContext = Record<string, unknown>;

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  /** Dot-namespaced, stable identifier: "contact.failure", "client.unhandled_error". */
  event: string;
  source: "server" | "client";
  context?: LogContext;
}

export interface ClientLogPayload {
  level: ClientShippableLevel;
  event: string;
  context?: LogContext;
  /** Page path where it happened. */
  path?: string;
}

export const MAX_LOG_BODY_BYTES = 8 * 1024;
const EVENT_PATTERN = /^[a-z0-9_]+(\.[a-z0-9_]+)*$/;
const MAX_EVENT_LENGTH = 80;

export interface SerializedError {
  name: string;
  message: string;
  stack?: string;
  digest?: string;
}

export function serializeError(error: unknown): SerializedError {
  if (error instanceof Error) {
    const digest = (error as Error & { digest?: unknown }).digest;
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...(typeof digest === "string" ? { digest } : {}),
    };
  }
  return { name: "NonError", message: typeof error === "string" ? error : safeStringify(error) };
}

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export type ParseResult<T> = { ok: true; value: T } | { ok: false; error: string };

/** Validates an untrusted body posted by the browser. */
export function parseClientLogPayload(input: unknown): ParseResult<ClientLogPayload> {
  if (!isPlainObject(input)) return { ok: false, error: "Body must be a JSON object" };

  const { level, event, context, path } = input;

  if (!CLIENT_SHIPPABLE_LEVELS.includes(level as ClientShippableLevel)) {
    return { ok: false, error: `level must be one of: ${CLIENT_SHIPPABLE_LEVELS.join(", ")}` };
  }
  if (typeof event !== "string" || event.length > MAX_EVENT_LENGTH || !EVENT_PATTERN.test(event)) {
    return { ok: false, error: "event must be a dot-namespaced lowercase identifier" };
  }
  if (context !== undefined && !isPlainObject(context)) {
    return { ok: false, error: "context must be an object" };
  }
  if (path !== undefined && (typeof path !== "string" || !path.startsWith("/"))) {
    return { ok: false, error: "path must start with /" };
  }

  return {
    ok: true,
    value: {
      level: level as ClientShippableLevel,
      event,
      ...(context !== undefined ? { context } : {}),
      ...(path !== undefined ? { path } : {}),
    },
  };
}
