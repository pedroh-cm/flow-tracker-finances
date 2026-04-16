"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { AppSidebar } from "@/src/views/components/layout/app-sidebar";

type AppLayoutShellProps = {
  children: React.ReactNode;
};

export function AppLayoutShell({ children }: AppLayoutShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center border-b border-border px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer rounded-md p-2 text-muted-foreground hover:text-foreground"
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>
          <span className="ml-3 font-display text-lg font-bold text-foreground">
            Flow<span className="text-gradient">Track</span>
          </span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
