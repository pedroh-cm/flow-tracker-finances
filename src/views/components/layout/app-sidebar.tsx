"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Sun,
  TrendingUp,
  X,
} from "lucide-react";

import { cn } from "@/src/lib/utils";
import { useAuthStore } from "@/src/viewmodels/stores/auth-store";
import { useThemeStore } from "@/src/viewmodels/stores/theme-store";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transações", icon: ArrowLeftRight },
  { href: "/investments", label: "Investimentos", icon: TrendingUp },
  { href: "/settings", label: "Configurações", icon: Settings },
];

type AppSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 -translate-x-full flex-col bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0",
          open && "translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Flow<span className="text-gradient">Track</span>
          </span>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mx-4 h-px bg-border/60" />

        <nav className="flex-1 space-y-1 px-3 py-5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-gradient-primary text-primary-foreground shadow-md glow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                )}
              >
                <Icon size={18} className={cn(active && "drop-shadow-sm")} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/40 p-3 space-y-2">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
            title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
          </button>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-xs font-bold text-primary-foreground shadow-sm">
                {user?.name?.slice(0, 2).toUpperCase() || "FT"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">{user?.name || "Usuário"}</p>
                <p className="truncate text-[10px] text-muted-foreground">{user?.email || ""}</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              title="Sair"
              aria-label="Sair"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
