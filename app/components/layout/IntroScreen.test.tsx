import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IntroScreen } from "./IntroScreen";

describe("IntroScreen", () => {
  it("types hello, world and then the welcome line", () => {
    render(<IntroScreen />);
    expect(document.querySelector(".intro-hello")).toHaveTextContent("hello, world");
    expect(document.querySelector(".intro-welcome")).toHaveTextContent("Welcome to my portfolio");
  });

  it("is decorative: hidden from assistive tech and never adds a heading", () => {
    render(<IntroScreen />);
    expect(screen.getByTestId("intro")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });
});
