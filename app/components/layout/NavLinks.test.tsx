import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NavLinks } from "./NavLinks";

const pathname = vi.hoisted(() => ({ current: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

describe("NavLinks", () => {
  beforeEach(() => {
    pathname.current = "/";
  });

  it("marks no link as current on the homepage", () => {
    render(<NavLinks />);
    expect(screen.queryByRole("link", { current: "page" })).toBeNull();
  });

  it("marks Work as current on a project detail page", () => {
    pathname.current = "/projects/spotify-pipeline";
    render(<NavLinks />);
    expect(screen.getByRole("link", { current: "page" })).toHaveTextContent("Work");
  });
});
