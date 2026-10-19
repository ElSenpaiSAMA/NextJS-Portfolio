import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BUILD_MODULES } from "../../data/source";
import { IntroScreen } from "./IntroScreen";

describe("IntroScreen", () => {
  it("compiles every module, then welcomes", () => {
    render(<IntroScreen />);
    for (const file of BUILD_MODULES) expect(screen.getByTestId("intro")).toHaveTextContent(`compiled ${file}`);
    expect(document.querySelector(".intro-welcome")).toHaveTextContent("Welcome to my portfolio");
    expect(document.querySelector(".intro-counter")).not.toBeNull();
  });

  it("is decorative: hidden from assistive tech and never adds a heading", () => {
    render(<IntroScreen />);
    expect(screen.getByTestId("intro")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });
});
