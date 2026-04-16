"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";

import { useAuthStore } from "@/src/viewmodels/stores/auth-store";
import { useThemeStore } from "@/src/viewmodels/stores/theme-store";
import { Button } from "@/src/views/components/ui/button";
import { Input } from "@/src/views/components/ui/form";
import { Label } from "@/src/views/components/ui/form";

export function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login } = useAuthStore();
  const { theme, hasHydrated, toggleTheme } = useThemeStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const nextPath = searchParams.get("next") ?? "/dashboard";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      login(email, password);
      router.push(nextPath);
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : "Não foi possível autenticar";
      setError(message);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-125 w-125 -translate-x-1/2 rounded-full bg-gradient-primary opacity-[0.06] blur-[120px]" />
      </div>

      <div className="fixed left-0 top-0 z-10 flex w-full items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>
        <button
          onClick={toggleTheme}
          className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Alternar tema"
        >
          {hasHydrated && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
        </button>
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">
            Flow<span className="text-gradient">Track</span>
          </span>
          <p className="mt-2 text-sm text-muted-foreground">Entre na sua conta para continuar</p>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1.5"
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-gradient-primary glow-sm text-primary-foreground hover:opacity-90">
              Entrar
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Não tem conta?{" "}
            <button
              onClick={() => {
                login("demo@flowtrack.com", "demo");
                router.push("/dashboard");
              }}
              className="font-medium text-primary hover:underline"
            >
              Acesso demo
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
