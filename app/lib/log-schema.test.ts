import { describe, expect, it } from "vitest";
import { parseClientLogPayload, serializeError } from "./log-schema";

describe("parseClientLogPayload", () => {
  it("accepts a minimal valid payload", () => {
    expect(parseClientLogPayload({ level: "error", event: "contact.failure" })).toEqual({
      ok: true,
      value: { level: "error", event: "contact.failure" },
    });
  });

  it("keeps context and path when valid", () => {
    const result = parseClientLogPayload({ level: "warn", event: "client.slow", context: { ms: 900 }, path: "/" });
    expect(result).toEqual({ ok: true, value: { level: "warn", event: "client.slow", context: { ms: 900 }, path: "/" } });
  });

  it.each([
    ["non-object body", "error"],
    ["array body", []],
    ["null body", null],
  ])("rejects %s", (_label, body) => {
    expect(parseClientLogPayload(body).ok).toBe(false);
  });

  it.each(["info", "debug", "fatal", undefined])("rejects level %s (browser may only ship warn/error)", (level) => {
    expect(parseClientLogPayload({ level, event: "a.b" }).ok).toBe(false);
  });

  it.each(["Has Spaces", "UPPER.case", "trailing.", "", "a".repeat(81), 42])("rejects malformed event %s", (event) => {
    expect(parseClientLogPayload({ level: "error", event }).ok).toBe(false);
  });

  it("rejects non-object context and relative path", () => {
    expect(parseClientLogPayload({ level: "error", event: "a", context: "x" }).ok).toBe(false);
    expect(parseClientLogPayload({ level: "error", event: "a", path: "https://evil" }).ok).toBe(false);
  });
});

describe("serializeError", () => {
  it("serializes Error instances with digest", () => {
    const err = Object.assign(new TypeError("boom"), { digest: "abc" });
    expect(serializeError(err)).toMatchObject({ name: "TypeError", message: "boom", digest: "abc" });
  });

  it("handles strings, objects and circular values", () => {
    expect(serializeError("oops")).toEqual({ name: "NonError", message: "oops" });
    expect(serializeError({ code: 1 })).toEqual({ name: "NonError", message: '{"code":1}' });
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    expect(serializeError(circular).name).toBe("NonError");
  });
});
