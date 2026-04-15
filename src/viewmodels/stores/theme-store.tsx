"use client";

import { ReactNode, useEffect } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ThemeMode } from "@/src/models/entities/theme-mode";

type ThemeStoreState = {
  theme: ThemeMode;
  hasHydrated: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

const applyThemeToDocument = (theme: ThemeMode) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const useThemeBaseStore = create<ThemeStoreState>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      hasHydrated: false,
      setTheme: (theme) => {
        applyThemeToDocument(theme);
        set({ theme });
      },
      toggleTheme: () => {
        const nextTheme: ThemeMode = get().theme === "dark" ? "light" : "dark";
        applyThemeToDocument(nextTheme);
        set({ theme: nextTheme });
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated });
      },
    }),
    {
      name: "flowtrack-theme",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

type ThemeStoreProviderProps = {
  children: ReactNode;
};

export function ThemeStoreProvider({ children }: ThemeStoreProviderProps) {
  const theme = useThemeBaseStore((state) => state.theme);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  return <>{children}</>;
}

export function useThemeStore() {
  const theme = useThemeBaseStore((state) => state.theme);
  const hasHydrated = useThemeBaseStore((state) => state.hasHydrated);
  const setTheme = useThemeBaseStore((state) => state.setTheme);
  const toggleTheme = useThemeBaseStore((state) => state.toggleTheme);

  return {
    theme,
    hasHydrated,
    setTheme,
    toggleTheme,
  };
}
