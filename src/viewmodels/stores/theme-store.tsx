"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { ThemeMode } from "@/src/models/entities/theme-mode";
import { LocalThemeRepository } from "@/src/models/services/local-theme-repository";
import { ToggleThemeUseCase } from "@/src/viewmodels/use-cases/toggle-theme-use-case";

type ThemeStoreContextValue = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

const ThemeStoreContext = createContext<ThemeStoreContextValue | null>(null);

const themeRepository = new LocalThemeRepository();
const toggleThemeUseCase = new ToggleThemeUseCase(themeRepository);

type ThemeStoreProviderProps = {
  children: ReactNode;
};

export function ThemeStoreProvider({ children }: ThemeStoreProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(() => themeRepository.getTheme());

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        const nextTheme = toggleThemeUseCase.execute(theme);
        setTheme(nextTheme);
      },
    }),
    [theme],
  );

  return <ThemeStoreContext.Provider value={contextValue}>{children}</ThemeStoreContext.Provider>;
}

export function useThemeStore() {
  const context = useContext(ThemeStoreContext);
  if (!context) {
    throw new Error("useThemeStore must be used within ThemeStoreProvider");
  }

  return context;
}
