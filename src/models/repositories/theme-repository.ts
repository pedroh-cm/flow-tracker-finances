import { ThemeMode } from "@/src/models/entities/theme-mode";

export interface ThemeRepository {
  getTheme(): ThemeMode;
  setTheme(theme: ThemeMode): void;
}
