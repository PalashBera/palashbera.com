"use client";

import { useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  isTheme,
  type Theme,
} from "@/lib/theme";

export type ResolvedTheme = "light" | "dark";

export type ThemeState = {
  /** What the user picked: "light", "dark", or "system". */
  theme: Theme;
  /** What is actually on screen. `null` on the server and during hydration. */
  resolvedTheme: ResolvedTheme | null;
};

const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * The theme lives in localStorage plus the OS colour-scheme media query — both
 * external systems — so it is modelled as an external store rather than React
 * state. That keeps the server render deterministic and avoids a setState pass
 * on mount.
 */
const listeners = new Set<() => void>();

const SERVER_STATE: ThemeState = { theme: DEFAULT_THEME, resolvedTheme: null };

let state: ThemeState = SERVER_STATE;
let initialized = false;
let media: MediaQueryList | null = null;

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function getMedia(): MediaQueryList {
  media ??= window.matchMedia(DARK_QUERY);
  return media;
}

function resolve(theme: Theme): ResolvedTheme {
  if (theme !== "system") return theme;
  return getMedia().matches ? "dark" : "light";
}

function applyToDocument(resolved: ResolvedTheme) {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

function commit(theme: Theme) {
  const resolvedTheme = resolve(theme);
  if (state.theme === theme && state.resolvedTheme === resolvedTheme) return;
  state = { theme, resolvedTheme };
  applyToDocument(resolvedTheme);
  for (const listener of listeners) listener();
}

function onSystemChange() {
  commit(state.theme);
}

function onStorage(event: StorageEvent) {
  if (event.key !== THEME_STORAGE_KEY) return;
  commit(isTheme(event.newValue) ? event.newValue : DEFAULT_THEME);
}

function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) {
    getMedia().addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
  }
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size > 0) return;
    getMedia().removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): ThemeState {
  if (!initialized) {
    initialized = true;
    const theme = readStoredTheme();
    state = { theme, resolvedTheme: resolve(theme) };
  }
  return state;
}

function getServerSnapshot(): ThemeState {
  return SERVER_STATE;
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private browsing or blocked storage: the choice just won't persist.
  }
  commit(theme);
}

export function useTheme(): ThemeState & { setTheme: (theme: Theme) => void } {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return { ...snapshot, setTheme };
}
