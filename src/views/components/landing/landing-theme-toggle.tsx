"use client";

import { Moon, Sun } from "lucide-react";

import { useThemeStore } from "@/src/viewmodels/stores/theme-store";

export function LandingThemeToggle() {
  const { theme, hasHydrated, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label="Alternar tema"
    >
      {hasHydrated && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
    </button>
  );
}
