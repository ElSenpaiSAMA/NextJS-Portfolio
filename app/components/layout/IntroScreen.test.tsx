import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BOOT_LINES } from "../../data/console";
import { IntroScreen } from "./IntroScreen";

describe("IntroScreen", () => {
  it("prints every boot line with a staggered index", () => {
    render(<IntroScreen />);
    const lines = [...document.querySelectorAll<HTMLElement>(".intro-line")];

    expect(lines).toHaveLength(BOOT_LINES.length);
    lines.forEach((line, i) => {
      expect(line).toHaveTextContent(BOOT_LINES[i]);
      expect(line.style.getPropertyValue("--i")).toBe(String(i));
    });
  });

  it("is decorative: hidden from assistive tech and never adds a heading", () => {
    render(<IntroScreen />);
    expect(screen.getByTestId("intro")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryAllByRole("heading")).toHaveLength(0);
    expect(screen.getByTestId("intro")).toHaveTextContent("Welcome to my portfolio");
  });
});
