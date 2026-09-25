import { beforeEach, describe, expect, it } from "vitest";
import { INTRO_INIT_SCRIPT, INTRO_SESSION_KEY } from "./intro";

function runScript() {
  // Same code the browser runs from the inline <head> script.
  new Function(INTRO_INIT_SCRIPT)();
}

describe("INTRO_INIT_SCRIPT", () => {
  beforeEach(() => {
    sessionStorage.clear();
    delete document.documentElement.dataset.intro;
  });

  it("lets the intro play on the first visit of the session and remembers it", () => {
    runScript();
    expect(document.documentElement.dataset.intro).toBeUndefined();
    expect(sessionStorage.getItem(INTRO_SESSION_KEY)).toBe("1");
  });

  it("marks the intro as seen on later loads in the same session", () => {
    runScript();
    runScript();
    expect(document.documentElement.dataset.intro).toBe("seen");
  });
});
