import { DEFAULT_CONFIG } from "./site-config";

export const CONFIG_STORAGE_KEY = "portfolio.config";

/**
 * Inlined in <head>: re-applies a config the visitor saved from the editor
 * before first paint (no flash of the default theme). Every value is
 * re-validated here — localStorage is user-controlled input.
 */
export const CONFIG_INIT_SCRIPT = `(function(){try{var c=JSON.parse(localStorage.getItem("${CONFIG_STORAGE_KEY}")||"null");if(!c)return;var r=document.documentElement;if(/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(c.accent))r.style.setProperty("--accent",c.accent);if(c.theme==="dark"||c.theme==="light")r.dataset.theme=c.theme;if(c.font==="sans"||c.font==="mono")r.dataset.font=c.font;if(Number.isInteger(c.radius)&&c.radius>=0&&c.radius<=32)r.style.setProperty("--r",c.radius+"px")}catch(e){}})();`;

/** Server-rendered attributes for <html> (the defaults; the script above may override them). */
export const DEFAULT_HTML_ATTRS = { "data-theme": DEFAULT_CONFIG.theme, "data-font": DEFAULT_CONFIG.font } as const;
