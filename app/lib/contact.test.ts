import { describe, expect, it, vi } from "vitest";
import { formspreeEndpoint, GENERIC_CONTACT_ERROR, submitContact, validateContact } from "./contact";

describe("validateContact", () => {
  const valid = { name: "Ana", email: "ana@example.com", message: "Hello, let's talk about a role." };

  it("returns no errors for valid input", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("flags every invalid field", () => {
    expect(validateContact({ name: "  ", email: "not-an-email", message: "short" })).toEqual({
      name: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
    });
  });
});

describe("submitContact", () => {
  const data = new FormData();

  it("posts to the Formspree endpoint and reports success", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    await expect(submitContact("abc", data, fetchMock)).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      formspreeEndpoint("abc"),
      expect.objectContaining({ method: "POST", headers: { Accept: "application/json" } }),
    );
  });

  it("maps Formspree field errors", async () => {
    const body = { errors: [{ field: "email", message: "should be an email" }, { message: "Form is disabled" }] };
    const fetchMock = vi.fn(async () => Response.json(body, { status: 422 }));
    await expect(submitContact("abc", data, fetchMock)).resolves.toEqual({
      ok: false,
      status: 422,
      message: "Form is disabled",
      fieldErrors: { email: "should be an email" },
    });
  });

  it("keeps a generic message for non-JSON errors", async () => {
    const fetchMock = vi.fn(async () => new Response("Bad gateway", { status: 502 }));
    await expect(submitContact("abc", data, fetchMock)).resolves.toMatchObject({ ok: false, status: 502, message: GENERIC_CONTACT_ERROR });
  });

  it("handles network failures without throwing", async () => {
    const fetchMock = vi.fn(async () => {
      throw new TypeError("Failed to fetch");
    });
    await expect(submitContact("abc", data, fetchMock)).resolves.toMatchObject({ ok: false, status: null });
  });
});
