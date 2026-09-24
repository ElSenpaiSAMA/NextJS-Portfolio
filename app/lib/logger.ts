import type { LogContext, LogEntry, LogLevel } from "./log-schema";

/**
 * Server-side structured logger. One JSON object per line on stdout/stderr,
 * which Vercel (or any log drain) indexes as-is. Use stable dot-namespaced
 * event names so logs can be filtered and alerted on.
 */

type Writer = (line: string) => void;

const WRITERS: Record<LogLevel, Writer> = {
  debug: (line) => console.debug(line),
  info: (line) => console.info(line),
  warn: (line) => console.warn(line),
  error: (line) => console.error(line),
};

export function formatLogEntry(entry: LogEntry): string {
  return JSON.stringify(entry);
}

function write(level: LogLevel, event: string, context?: LogContext, source: LogEntry["source"] = "server"): LogEntry {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    event,
    source,
    ...(context ? { context } : {}),
  };
  WRITERS[level](formatLogEntry(entry));
  return entry;
}

export const logger = {
  debug: (event: string, context?: LogContext) => write("debug", event, context),
  info: (event: string, context?: LogContext) => write("info", event, context),
  warn: (event: string, context?: LogContext) => write("warn", event, context),
  error: (event: string, context?: LogContext) => write("error", event, context),
  /** Re-emits an entry that originated in the browser (see app/api/log). */
  fromClient: (level: LogLevel, event: string, context?: LogContext) => write(level, event, context, "client"),
};
