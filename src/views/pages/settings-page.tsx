"use client";

import { Moon, Sun } from "lucide-react";

import { useAuthStore } from "@/src/viewmodels/stores/auth-store";
import { useThemeStore } from "@/src/viewmodels/stores/theme-store";
import { Button } from "@/src/views/components/ui/button";
import { Input } from "@/src/views/components/ui/input";
import { Label } from "@/src/views/components/ui/label";

export function SettingsPage() {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground">Gerencie seu perfil e preferências</p>
      </div>

      <div className="animate-fade-in space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-xl font-bold text-primary-foreground">
            {user?.name?.slice(0, 2).toUpperCase() || "FT"}
          </div>
          <div>
            <p className="font-semibold text-card-foreground">{user?.name || "Usuário"}</p>
            <p className="text-sm text-muted-foreground">{user?.email || ""}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Nome completo</Label>
            <Input defaultValue={user?.name || ""} />
          </div>
          <div>
            <Label>E-mail</Label>
            <Input defaultValue={user?.email || ""} type="email" />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input defaultValue="(11) 99999-9999" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">Salvar Alterações</Button>
        </div>
      </div>

      <div className="animate-fade-in rounded-2xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "0.1s" }}>
        <h2 className="mb-4 font-display text-base font-semibold text-foreground">Aparência</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Tema</p>
            <p className="text-xs text-muted-foreground">
              {theme === "dark" ? "Modo escuro ativado" : "Modo claro ativado"}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-2">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
          </Button>
        </div>
      </div>
    </div>
  );
}
