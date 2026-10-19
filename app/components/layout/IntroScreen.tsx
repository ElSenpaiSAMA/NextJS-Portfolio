/**
 * Welcome screen: `hello, world` types itself, gets erased, and "Welcome to my
 * portfolio" types in its place; then the screen fades. Everything is CSS
 * (see `.intro` in globals.css):
 * - plays once per browser session (INTRO_INIT_SCRIPT sets html[data-intro="seen"]);
 * - skipped entirely with prefers-reduced-motion;
 * - pointer-events: none, so it never blocks the page underneath.
 * Decorative only, hence aria-hidden — the page's real h1 is in the Hero.
 */
export function IntroScreen() {
  return (
    <div className="intro" aria-hidden="true" data-testid="intro">
      <p>
        <span className="intro-stage">
          <span className="intro-hello">hello, world</span>
          <span className="intro-welcome">Welcome to my portfolio</span>
        </span>
      </p>
      <span className="intro-caret" />
    </div>
  );
}
