export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Inlined in <head> so the correct theme is applied before first paint
 * (no light→dark flash). Stored choice wins; otherwise follow the OS.
 * Kept as a string because it must run before any bundle loads.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;

export function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* Private mode / blocked storage: the theme still applies for this visit. */
  }
}
