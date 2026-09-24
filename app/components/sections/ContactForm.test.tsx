import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

const logSpy = vi.hoisted(() => ({ info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() }));
vi.mock("../../lib/client-logger", () => ({ clientLogger: logSpy }));

async function fillValid() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Name"), "Ana");
  await user.type(screen.getByLabelText("Email"), "ana@example.com");
  await user.type(screen.getByLabelText("Message"), "Hello, I have a platform role for you.");
  return user;
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    Object.values(logSpy).forEach((fn) => fn.mockClear());
  });

  it("shows field errors and does not submit invalid input", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm formId="abc" />);

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(/valid email/);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(logSpy.info).toHaveBeenCalledWith("contact.validation_failed", expect.anything());
  });

  it("submits and shows the success state", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
    render(<ContactForm formId="abc" />);
    const user = await fillValid();

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Message sent.");
    expect(logSpy.info).toHaveBeenCalledWith("contact.success");
  });

  it("shows an alert and logs an error when delivery fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("oops", { status: 500 })));
    render(<ContactForm formId="abc" />);
    const user = await fillValid();

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/could not be sent/);
    expect(logSpy.error).toHaveBeenCalledWith("contact.failure", expect.objectContaining({ status: 500 }));
  });
});
