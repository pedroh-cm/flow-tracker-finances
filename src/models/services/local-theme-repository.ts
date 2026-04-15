import { ThemeMode } from "@/src/models/entities/theme-mode";
import { ThemeRepository } from "@/src/models/repositories/theme-repository";

const THEME_STORAGE_KEY = "flowtrack-theme";

export class LocalThemeRepository implements ThemeRepository {
  getTheme(): ThemeMode {
    if (typeof window === "undefined") return "light";

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    if (typeof window.matchMedia !== "function") {
      return "light";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  setTheme(theme: ThemeMode): void {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}
