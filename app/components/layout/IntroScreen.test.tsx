import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BOOT_LINES } from "../../data/shell";
import { IntroScreen } from "./IntroScreen";

describe("IntroScreen", () => {
  it("boots: every [ OK ] line, the login, then the welcome line", () => {
    render(<IntroScreen />);
    const boot = [...document.querySelectorAll(".intro-boot")].map((el) => el.textContent);
    expect(boot).toEqual(BOOT_LINES.map((text) => `[  OK  ] ${text}`));
    expect(screen.getByTestId("intro")).toHaveTextContent("speroni login: matias");
    expect(document.querySelector(".intro-welcome")).toHaveTextContent("Welcome to my portfolio");
  });

  it("is decorative: hidden from assistive tech and never adds a heading", () => {
    render(<IntroScreen />);
    expect(screen.getByTestId("intro")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });
});
