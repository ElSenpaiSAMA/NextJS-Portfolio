export const INTRO_SESSION_KEY = "intro-seen";

/**
 * Inlined in <head> next to the theme script. Marks <html data-intro="seen">
 * when the intro already played in this browser session, so CSS hides it
 * before first paint (no flash on reloads). Pure CSS runs the animation
 * itself — no client JavaScript involved.
 */
export const INTRO_INIT_SCRIPT = `(function(){try{var s=sessionStorage;if(s.getItem("${INTRO_SESSION_KEY}")){document.documentElement.dataset.intro="seen"}else{s.setItem("${INTRO_SESSION_KEY}","1")}}catch(e){}})();`;
