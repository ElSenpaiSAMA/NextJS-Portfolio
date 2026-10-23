import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { STAGES } from "./data/pipeline";
import { profile } from "./data/profile";
import { experience } from "./data/experience";
import { projects } from "./data/projects";
import { stack } from "./data/stack";
import { NAV_ITEMS } from "./lib/site";
import HomePage from "./page";

describe("Home page", () => {
  it("introduces who I am: one h1, role and availability", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(profile.name);
    expect(screen.getByText(profile.role, { selector: "p" })).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(profile.availability)).length).toBeGreaterThan(0);
  });

  it("lays the page out as a terminal session: one command per section, in order", () => {
    const { container } = render(<HomePage />);
    const stages = [...container.querySelectorAll<HTMLElement>("[data-stage]")].map((el) => el.dataset.stage);
    expect(stages).toEqual(STAGES.map((s) => s.id));
    // Without motion (jsdom) every command is already typed out.
    for (const stage of STAGES) expect(screen.getByTestId(`prompt-${stage.id}`)).toHaveTextContent(`matias@speroni:~$ ${stage.command}`);
    expect(screen.getByTestId("deploy-run").querySelectorAll("li")).toHaveLength(STAGES.length);
  });

  it("has a shell you can type into", async () => {
    render(<HomePage />);
    const input = screen.getByRole("textbox", { name: /Type a command/ });
    fireEvent.change(input, { target: { value: "whoami" } });
    fireEvent.submit(input.closest("form")!);
    expect(within(screen.getByRole("log", { name: "Shell output" })).getByText(new RegExp(`${profile.name} — ${profile.role}`))).toBeInTheDocument();
    expect(input).toHaveValue("");
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

  it("lists every job with its roles and periods", () => {
    render(<HomePage />);
    const section = screen.getByRole("region", { name: "Experience" });
    for (const item of experience) {
      expect(within(section).getByRole("heading", { name: item.company })).toBeInTheDocument();
      for (const role of item.roles) {
        expect(within(section).getAllByText(role.title).length).toBeGreaterThan(0);
        expect(within(section).getByText(role.period)).toBeInTheDocument();
      }
    }
  });

  it("shows the full stack, grouped", () => {
    render(<HomePage />);
    const section = screen.getByRole("region", { name: "Stack" });
    for (const group of stack) {
      expect(within(section).getByRole("heading", { name: group.title })).toBeInTheDocument();
      for (const item of group.items) expect(within(section).getAllByText(item.name).length).toBeGreaterThan(0);
    }
  });

  it("shows the portrait, bio facts and direct contact channels", () => {
    render(<HomePage />);
    const about = screen.getByRole("region", { name: "About" });
    expect(within(about).getByRole("img", { name: `Portrait of ${profile.name}` })).toBeInTheDocument();
    // jsdom doesn't map <dt> wrapped in <div> to role "term", so query the list directly.
    const facts = about.querySelector("dl")!;
    for (const fact of profile.facts) {
      expect(within(facts).getByText(fact.label)).toBeInTheDocument();
      expect(within(facts).getByText(fact.value)).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: new RegExp(profile.email) })).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(screen.getByRole("link", { name: new RegExp(profile.phone.replace("+", "\\+")) })).toHaveAttribute("href", `tel:${profile.phoneHref}`);
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
