import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { profile } from "../../data/profile";
import { IntroScreen } from "./IntroScreen";

describe("IntroScreen", () => {
  it("spells the full name letter by letter with staggered indices", () => {
    render(<IntroScreen />);
    const letters = [...document.querySelectorAll<HTMLElement>(".intro-letter")];
    const expected = profile.name.replace(/\s/g, "");

    expect(letters.map((l) => l.textContent).join("")).toBe(expected);
    expect(letters.map((l) => l.style.getPropertyValue("--i"))).toEqual(expected.split("").map((_, i) => String(i)));
  });

  it("is decorative: hidden from assistive tech and never adds a heading", () => {
    render(<IntroScreen />);
    expect(screen.getByTestId("intro")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryAllByRole("heading")).toHaveLength(0);
    expect(screen.getByTestId("intro")).toHaveTextContent("Welcome to my portfolio");
  });
});
