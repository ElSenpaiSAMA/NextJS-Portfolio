import type { CSSProperties } from "react";
import { BOOT_LINES } from "../../data/console";

/**
 * Boot screen: systemd-style lines print one by one, a welcome line appears,
 * then the panel slides up. Everything is CSS (see `.intro` in globals.css):
 * - plays once per browser session (INTRO_INIT_SCRIPT sets html[data-intro="seen"]);
 * - skipped entirely with prefers-reduced-motion;
 * - pointer-events: none, so it never blocks the page underneath.
 * Decorative only, hence aria-hidden — the page's real h1 is in the Hero.
 */
export function IntroScreen() {
  return (
    <div className="intro" aria-hidden="true" data-testid="intro">
      <div>
        {BOOT_LINES.map((line, i) => (
          <p key={line} className="intro-line" style={{ "--i": i } as CSSProperties}>
            <span className="text-fg-subtle">[</span>
            <span className="text-green">{"  OK  "}</span>
            <span className="text-fg-subtle">]</span> <span className="text-fg-muted">{line}</span>
          </p>
        ))}
        <p className="intro-welcome">
          <span className="text-amber">$</span> Welcome to my portfolio<span className="cursor" />
        </p>
      </div>
    </div>
  );
}
