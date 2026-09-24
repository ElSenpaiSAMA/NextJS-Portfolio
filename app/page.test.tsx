import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { NAV_ITEMS } from "./lib/site";
import Home from "./page";

describe("Home page", () => {
  it("renders the role, one h1 and every nav target", () => {
    const { container } = render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText(profile.role)).toBeInTheDocument();
    for (const { id } of NAV_ITEMS) {
      expect(container.querySelector(`#${id}`), `#${id}`).not.toBeNull();
    }
  });

  it("renders every project with an anchor", () => {
    const { container } = render(<Home />);
    for (const p of projects) {
      expect(container.querySelector(`#${p.slug}`), p.slug).not.toBeNull();
    }
  });

  it("opens every external link safely", () => {
    const { container } = render(<Home />);
    const external = container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]');
    expect(external.length).toBeGreaterThan(0);
    for (const a of external) {
      expect(a.target, a.href).toBe("_blank");
      expect(a.rel, a.href).toContain("noopener");
    }
  });

  it("points in-page anchors at existing ids", () => {
    const { container } = render(<Home />);
    for (const a of container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      const id = a.getAttribute("href")!.slice(1);
      expect(container.querySelector(`[id="${id}"]`), a.getAttribute("href")!).not.toBeNull();
    }
  });

  it("hides the CV button until a CV is configured", () => {
    render(<Home />);
    const hero = screen.getByRole("region", { name: profile.name });
    const cv = within(hero).queryByRole("link", { name: /CV/ });
    if (profile.cvUrl) expect(cv).toHaveAttribute("href", profile.cvUrl);
    else expect(cv).toBeNull();
  });
});
