import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clientLogger, LOG_ENDPOINT, MAX_SHIPPED_PER_PAGE, reportClientError, resetClientLoggerBudget } from "./client-logger";

async function beaconBody(mock: ReturnType<typeof vi.fn>, call = 0): Promise<unknown> {
  const blob = mock.mock.calls[call][1] as Blob;
  return JSON.parse(await blob.text());
}

describe("clientLogger", () => {
  let sendBeacon: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    resetClientLoggerBudget();
    sendBeacon = vi.fn(() => true);
    Object.defineProperty(navigator, "sendBeacon", { value: sendBeacon, configurable: true });
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("ships error and warn entries to the log endpoint", async () => {
    clientLogger.error("contact.failure", { status: 500 });
    clientLogger.warn("client.slow");

    expect(sendBeacon).toHaveBeenCalledTimes(2);
    expect(sendBeacon.mock.calls[0][0]).toBe(LOG_ENDPOINT);
    expect(await beaconBody(sendBeacon)).toEqual({ level: "error", event: "contact.failure", context: { status: 500 }, path: "/" });
  });

  it("never ships info/debug entries", () => {
    clientLogger.info("contact.submit");
    clientLogger.debug("x.y");
    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it("caps shipped entries per page to avoid error loops", () => {
    for (let i = 0; i < MAX_SHIPPED_PER_PAGE + 5; i++) clientLogger.error("loop.error");
    expect(sendBeacon).toHaveBeenCalledTimes(MAX_SHIPPED_PER_PAGE);
  });

  it("falls back to fetch when sendBeacon is unavailable or refuses", () => {
    sendBeacon.mockReturnValue(false);
    const fetchMock = vi.fn(() => Promise.resolve(new Response(null, { status: 204 })));
    vi.stubGlobal("fetch", fetchMock);

    clientLogger.error("x.y");
    expect(fetchMock).toHaveBeenCalledWith(LOG_ENDPOINT, expect.objectContaining({ method: "POST", keepalive: true }));
  });

  it("does not throw when shipping fails", () => {
    sendBeacon.mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => clientLogger.error("x.y")).not.toThrow();
  });

  it("reportClientError serializes the error", async () => {
    reportClientError("client.unhandled_error", new RangeError("bad"), { line: 3 });
    expect(await beaconBody(sendBeacon)).toMatchObject({
      event: "client.unhandled_error",
      context: { line: 3, error: { name: "RangeError", message: "bad" } },
    });
  });
});
