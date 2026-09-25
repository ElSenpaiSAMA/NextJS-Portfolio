import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { stack } from "./data/stack";
import { NAV_ITEMS } from "./lib/site";
import HomePage from "./page";

describe("Home page", () => {
  it("introduces who I am: one h1, role and availability", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(profile.name);
    expect(screen.getByText(profile.role)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(profile.availability))).toBeInTheDocument();
  });

  it("renders a section for every nav item", () => {
    const { container } = render(<HomePage />);
    for (const { id } of NAV_ITEMS) expect(container.querySelector(`section#${id}`), `#${id}`).not.toBeNull();
  });

  it("renders every project with its image and links", () => {
    render(<HomePage />);
    for (const p of projects) {
      const card = screen.getByRole("article", { name: p.title });
      expect(within(card).getByRole("img", { name: `Screenshot of ${p.title}` })).toBeInTheDocument();
      if (p.github) expect(within(card).getByRole("link", { name: /Code/ })).toHaveAttribute("href", p.github);
      if (p.siteLink) expect(within(card).getByRole("link", { name: /Live site/ })).toHaveAttribute("href", p.siteLink);
    }
  });

  it("shows the full stack, grouped", () => {
    render(<HomePage />);
    const section = screen.getByRole("region", { name: "What I work with" });
    for (const group of stack) {
      expect(within(section).getByRole("heading", { name: group.title })).toBeInTheDocument();
      for (const item of group.items) expect(within(section).getByText(item.name)).toBeInTheDocument();
    }
  });

  it("shows the portrait, bio facts and direct contact channels", () => {
    render(<HomePage />);
    const about = screen.getByRole("region", { name: "Who I am" });
    expect(within(about).getByRole("img", { name: `Portrait of ${profile.name}` })).toBeInTheDocument();
    // jsdom doesn't map <dt> wrapped in <div> to role "term", so query the list directly.
    const facts = about.querySelector("dl")!;
    for (const fact of profile.facts) {
      expect(within(facts).getByText(fact.label)).toBeInTheDocument();
      expect(within(facts).getByText(fact.value)).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: new RegExp(profile.email) })).toHaveAttribute("href", `mailto:${profile.email}`);
  });

  it("opens every external link safely", () => {
    const { container } = render(<HomePage />);
    const external = container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]');
    expect(external.length).toBeGreaterThan(0);
    for (const a of external) {
      expect(a.target, a.href).toBe("_blank");
      expect(a.rel, a.href).toContain("noopener");
    }
  });

  it("points every in-page anchor at an existing id", () => {
    const { container } = render(<HomePage />);
    for (const a of container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      const id = a.getAttribute("href")!.slice(1);
      expect(container.querySelector(`[id="${id}"]`), a.getAttribute("href")!).not.toBeNull();
    }
  });

  it("hides the CV button until a CV is configured", () => {
    render(<HomePage />);
    const cv = screen.queryByRole("link", { name: /^CV$/ });
    if (profile.cvUrl) expect(cv).toHaveAttribute("href", profile.cvUrl);
    else expect(cv).toBeNull();
  });
});
