import { ThemeMode } from "@/src/models/entities/theme-mode";
import { ThemeRepository } from "@/src/models/repositories/theme-repository";

export class ToggleThemeUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  execute(currentTheme: ThemeMode): ThemeMode {
    const nextTheme: ThemeMode = currentTheme === "dark" ? "light" : "dark";
    this.themeRepository.setTheme(nextTheme);
    return nextTheme;
  }
}
