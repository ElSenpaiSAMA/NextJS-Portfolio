import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import { skillCategories } from "./data/skills";
import { NAV_ITEMS, projectHref } from "./lib/site";
import HomePage from "./page";
import ProjectPage, { generateStaticParams } from "./projects/[slug]/page";
import ProjectsPage from "./projects/page";
import SkillsPage from "./skills/page";

// Server-only navigation helpers used by the pages.
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
  usePathname: () => "/",
}));

const KNOWN_PATHS = new Set<string>(["/", ...NAV_ITEMS.map((n) => n.href), ...projects.map((p) => projectHref(p.slug))]);

async function renderProject(slug: string) {
  const element = (await ProjectPage({ params: Promise.resolve({ slug }) })) as ReactElement;
  return render(element);
}

/** Shared invariants every page must satisfy. */
function expectSoundPage(container: HTMLElement) {
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

  for (const a of container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')) {
    expect(a.target, a.href).toBe("_blank");
    expect(a.rel, a.href).toContain("noopener");
  }
  for (const a of container.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')) {
    const path = a.getAttribute("href")!.split("#")[0];
    expect(KNOWN_PATHS.has(path), `internal link ${path}`).toBe(true);
  }
}

describe("static pages", () => {
  it.each([
    ["home", HomePage],
    ["projects", ProjectsPage],
    ["skills", SkillsPage],
    ["about", AboutPage],
    ["contact", ContactPage],
  ])("%s has one h1, safe external links and no dead internal links", (_name, Page) => {
    const { container } = render(<Page />);
    expectSoundPage(container);
  });

  it("home states the role and links the featured case studies", () => {
    render(<HomePage />);
    expect(screen.getByText(new RegExp(profile.role.replace("/", "\\/")))).toBeInTheDocument();
    for (const p of projects.filter((p) => p.featured)) {
      expect(screen.getByRole("link", { name: new RegExp(p.title) })).toHaveAttribute("href", projectHref(p.slug));
    }
  });

  it("home hides the CV link until a CV is configured", () => {
    render(<HomePage />);
    const cv = screen.queryByRole("link", { name: /CV/ });
    if (profile.cvUrl) expect(cv).toHaveAttribute("href", profile.cvUrl);
    else expect(cv).toBeNull();
  });

  it("projects lists every project and the roadmap", () => {
    const { container } = render(<ProjectsPage />);
    for (const p of projects) expect(container.querySelector(`a[href="${projectHref(p.slug)}"]`), p.slug).not.toBeNull();
    expect(container.querySelector("#roadmap")).not.toBeNull();
  });

  it("skills renders every category", () => {
    render(<SkillsPage />);
    for (const c of skillCategories) expect(screen.getByRole("heading", { name: c.title })).toBeInTheDocument();
  });

  it("contact shows email and LinkedIn without the form", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(screen.getByRole("link", { name: /linkedin\.com/ })).toBeInTheDocument();
  });
});

describe("project detail pages", () => {
  it("pre-renders exactly one page per project", () => {
    expect(generateStaticParams()).toEqual(projects.map((p) => ({ slug: p.slug })));
  });

  it.each(projects.map((p) => [p.slug]))("%s renders the full case study", async (slug) => {
    const project = projects.find((p) => p.slug === slug)!;
    const { container } = await renderProject(slug);

    expectSoundPage(container);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(project.title);
    for (const section of ["Problem", "Solution", "Architecture", "How it deploys", "Outcome", "What it still needs"]) {
      expect(screen.getByRole("heading", { name: section })).toBeInTheDocument();
    }
    expect(screen.getByRole("list", { name: `${project.title} architecture` }).children).toHaveLength(project.architecture.length);
  });

  it("unknown slugs trigger notFound()", async () => {
    await expect(renderProject("does-not-exist")).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
