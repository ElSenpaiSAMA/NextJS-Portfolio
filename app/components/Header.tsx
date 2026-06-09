"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-paper transition-shadow duration-200 ${
        scrolled ? "border-b border-hairline" : ""
      }`}
      style={{ viewTransitionName: "site-header" }}
    >
      <Navbar />
    </header>
  );
}
