export const THEMES = ["light", "dark", "system"] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "system";

export const THEME_STORAGE_KEY = "theme";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

/**
 * Runs before first paint to apply the stored (or system) theme, so the page
 * never flashes the wrong colours during hydration. Also marks the document as
 * script-enabled, which is what gates the scroll-reveal animations.
 *
 * Kept dependency-free and stringified because it has to execute synchronously
 * in <head>; the contents are static and contain no interpolated user input.
 */
export const themeInitScript = `(function(){var r=document.documentElement;r.classList.add("js");try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)},s=localStorage.getItem(k),m=window.matchMedia("(prefers-color-scheme: dark)").matches,d=s==="dark"||(s!=="light"&&m);r.classList.toggle("dark",d)}catch(e){}})();`;
