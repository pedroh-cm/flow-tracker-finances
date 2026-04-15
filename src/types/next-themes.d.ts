declare module "next-themes" {
  import type { ComponentType, ReactNode } from "react";

  export type ThemeProviderProps = {
    children: ReactNode;
    attribute?: "class" | "data-theme";
    defaultTheme?: "light" | "dark" | "system";
    enableSystem?: boolean;
  };

  export const ThemeProvider: ComponentType<ThemeProviderProps>;

  export function useTheme(): {
    theme?: string;
    resolvedTheme?: string;
    setTheme: (theme: string) => void;
  };
}
