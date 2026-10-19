import type { CSSProperties } from "react";
import { BUILD_MODULES } from "../../data/source";

/**
 * Build screen: the site's real modules "compile" one by one while a counter
 * runs 0→100%, then "Welcome to my portfolio" and the panel wipes up.
 * Everything is CSS (see `.intro` in globals.css):
 * - plays once per browser session (INTRO_INIT_SCRIPT sets html[data-intro="seen"]);
 * - skipped entirely with prefers-reduced-motion;
 * - pointer-events: none, so it never blocks the page underneath.
 * Decorative only, hence aria-hidden — the page's real h1 is in the Hero.
 */
export function IntroScreen() {
  return (
    <div className="intro" aria-hidden="true" data-testid="intro">
      <p className="intro-line" style={{ "--i": 0 } as CSSProperties}>
        <span className="text-accent">$</span> next build
      </p>
      {BUILD_MODULES.map((module, i) => (
        <p key={module} className="intro-line" style={{ "--i": i + 1 } as CSSProperties}>
          <span className="text-mint">✓</span> compiled {module}
        </p>
      ))}
      <p className="intro-counter" />
      <span className="intro-bar" />
      <p className="intro-welcome">Welcome to my portfolio</p>
    </div>
  );
}
