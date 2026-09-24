import { describe, expect, it, vi } from "vitest";
import { MAX_LOG_BODY_BYTES } from "../../lib/log-schema";
import { POST } from "./route";

function post(body: string): Request {
  return new Request("http://localhost/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "vitest" },
    body,
  });
}

describe("POST /api/log", () => {
  it("accepts a valid payload, logs it and returns 204", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(post(JSON.stringify({ level: "error", event: "contact.failure", path: "/" })));

    expect(res.status).toBe(204);
    const entry = JSON.parse(spy.mock.calls[0][0] as string);
    expect(entry).toMatchObject({ source: "client", event: "contact.failure", context: { path: "/", userAgent: "vitest" } });
  });

  it("returns 400 for invalid JSON", async () => {
    expect((await POST(post("{not json"))).status).toBe(400);
  });

  it("returns 400 with a reason for an invalid payload", async () => {
    const res = await POST(post(JSON.stringify({ level: "info", event: "x" })));
    expect(res.status).toBe(400);
    expect(await res.json()).toHaveProperty("error");
  });

  it("returns 413 for oversized bodies", async () => {
    const big = JSON.stringify({ level: "error", event: "x", context: { blob: "a".repeat(MAX_LOG_BODY_BYTES) } });
    expect((await POST(post(big))).status).toBe(413);
  });
});
