import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { profile } from "../../data/profile";
import { IntroScreen } from "./IntroScreen";

describe("IntroScreen", () => {
  it("brings the name into focus, then the welcome line", () => {
    render(<IntroScreen />);
    expect(document.querySelector(".intro-name")).toHaveTextContent(profile.name);
    expect(document.querySelector(".intro-welcome")).toHaveTextContent("Welcome to my portfolio");
  });

  it("is decorative: hidden from assistive tech and never adds a heading", () => {
    render(<IntroScreen />);
    expect(screen.getByTestId("intro")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryAllByRole("heading")).toHaveLength(0);
  });
});
