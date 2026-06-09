"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/sobre-mi", label: "About" },
  { href: "/proyectos", label: "Projects" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      {/* Brand */}
      <Link
        href="/"
        className="font-serif text-lg text-ink tracking-tight hover:text-accent transition-colors duration-200"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Matias Speroni
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "text-ink underline decoration-accent underline-offset-4"
                    : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 text-ink"
      >
        <span
          className={`block h-px w-5 bg-current transition-transform duration-200 origin-center ${
            menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
          }`}
        />
        <span
          className={`block h-px w-5 bg-current transition-opacity duration-200 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-px w-5 bg-current transition-transform duration-200 origin-center ${
            menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
          }`}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-surface border-b border-hairline shadow-sm z-40">
          <ul className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "text-ink underline decoration-accent underline-offset-4"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
