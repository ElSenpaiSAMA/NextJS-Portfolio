import { describe, expect, it, vi } from "vitest";
import { logger } from "./logger";

describe("server logger", () => {
  it("writes one JSON line per entry to the matching console method", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    logger.error("server.request_error", { path: "/x" });

    expect(spy).toHaveBeenCalledTimes(1);
    const entry = JSON.parse(spy.mock.calls[0][0] as string);
    expect(entry).toMatchObject({ level: "error", event: "server.request_error", source: "server", context: { path: "/x" } });
    expect(() => new Date(entry.timestamp).toISOString()).not.toThrow();
  });

  it("marks re-emitted browser logs with source=client", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    logger.fromClient("warn", "client.slow");
    expect(JSON.parse(spy.mock.calls[0][0] as string)).toMatchObject({ source: "client", level: "warn" });
  });

  it("omits context when none is given", () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => {});
    logger.info("app.start");
    expect(JSON.parse(spy.mock.calls[0][0] as string)).not.toHaveProperty("context");
  });
});
