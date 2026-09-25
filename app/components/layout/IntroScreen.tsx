import type { CSSProperties } from "react";
import { profile } from "../../data/profile";

/**
 * Welcome screen: the name reveals letter by letter, a line draws under it,
 * then the panel slides up. Everything is CSS (see `.intro` in globals.css):
 * - plays once per browser session (INTRO_INIT_SCRIPT sets html[data-intro="seen"]);
 * - skipped entirely with prefers-reduced-motion;
 * - pointer-events: none, so it never blocks the page underneath.
 * Decorative only, hence aria-hidden — the page's real h1 is in the Hero.
 */
export function IntroScreen() {
  const words = profile.name.split(" ");
  let letterIndex = 0;

  return (
    <div className="intro" aria-hidden="true" data-testid="intro">
      <div className="intro-content">
        <p className="intro-name">
          {words.map((word) => (
            <span key={word} className="intro-word">
              {word.split("").map((char, i) => {
                const style = { "--i": letterIndex++ } as CSSProperties;
                return (
                  <span key={`${char}-${i}`} className="intro-letter-mask">
                    <span className="intro-letter" style={style}>
                      {char}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </p>
        <span className="intro-line" />
        <p className="intro-subtitle">Welcome to my portfolio</p>
      </div>
    </div>
  );
}
