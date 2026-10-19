import { profile } from "../../data/profile";

/**
 * Welcome screen: the name comes into focus, the welcome line fades in, then
 * the screen dissolves. Everything is CSS (see `.intro` in globals.css):
 * - plays once per browser session (INTRO_INIT_SCRIPT sets html[data-intro="seen"]);
 * - skipped entirely with prefers-reduced-motion;
 * - pointer-events: none, so it never blocks the page underneath.
 * Decorative only, hence aria-hidden — the page's real h1 is in the Hero.
 */
export function IntroScreen() {
  return (
    <div className="intro" aria-hidden="true" data-testid="intro">
      <p className="intro-name">{profile.name}</p>
      <p className="intro-welcome ink-gradient">Welcome to my portfolio</p>
    </div>
  );
}
