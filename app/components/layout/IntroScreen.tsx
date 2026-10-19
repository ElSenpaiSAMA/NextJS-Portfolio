import type { CSSProperties } from "react";
import { BOOT_LINES, PROMPT } from "../../data/shell";

const WELCOME = "Welcome to my portfolio";

/**
 * Boot screen: systemd-style `[ OK ]` lines print one by one, the login
 * appears, "Welcome to my portfolio" types itself, then the screen fades.
 * Everything is CSS (see `.intro` in globals.css):
 * - plays once per browser session (INTRO_INIT_SCRIPT sets html[data-intro="seen"]);
 * - skipped entirely with prefers-reduced-motion;
 * - pointer-events: none, so it never blocks the page underneath.
 * Decorative only, hence aria-hidden — the page's real h1 is in neofetch.
 */
export function IntroScreen() {
  const line = (i: number) => ({ "--i": i }) as CSSProperties;
  return (
    <div className="intro" aria-hidden="true" data-testid="intro">
      {BOOT_LINES.map((text, i) => (
        <p key={text} className="intro-line intro-boot" style={line(i)}>
          [<span className="text-ok">  OK  </span>] {text}
        </p>
      ))}
      <p className="intro-line mt-4" style={line(BOOT_LINES.length + 0.5)}>
        {PROMPT.host} login: <span className="text-fg">{PROMPT.user}</span>
      </p>
      <p className="intro-welcome">
        <span className="typed" style={{ "--chars": WELCOME.length } as CSSProperties}>
          {WELCOME}
        </span>
        <span className="caret" />
      </p>
    </div>
  );
}
