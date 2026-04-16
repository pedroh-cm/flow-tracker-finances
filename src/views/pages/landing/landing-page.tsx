"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Globe, Lock, Moon, Shield, Sun, Wallet, Zap } from "lucide-react";

import { useThemeStore } from "@/src/viewmodels/stores/theme-store";
import { Button } from "@/src/views/components/ui/button";

const features = [
  { icon: Zap, title: "Tempo Real", desc: "Acompanhe suas finanças com atualizações instantâneas e notificações." },
  { icon: Shield, title: "Segurança Total", desc: "Seus dados protegidos com criptografia de ponta a ponta." },
  { icon: BarChart3, title: "Análises Inteligentes", desc: "Gráficos e insights para decisões financeiras mais assertivas." },
  { icon: Wallet, title: "Multi-carteiras", desc: "Gerencie múltiplas contas e carteiras em um só lugar." },
  { icon: Globe, title: "Multi-moeda", desc: "Suporte a diferentes moedas e conversão automática." },
  { icon: Lock, title: "Controle Total", desc: "Categorize, filtre e exporte seus dados como preferir." },
];

export function LandingPage() {
  const { theme, hasHydrated, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 z-50 w-full glass">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Flow<span className="text-gradient">Track</span>
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Alternar tema"
            >
              {hasHydrated && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
            </button>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-gradient-primary glow-sm text-primary-foreground hover:opacity-90">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-150 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-primary opacity-[0.07] blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-100 w-100 rounded-full bg-gradient-primary opacity-[0.05] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Suas finanças no
            <br />
            <span className="text-gradient">próximo nível</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Gerencie transações, acompanhe investimentos e tome decisões financeiras inteligentes com uma
            interface moderna e intuitiva.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-primary px-8 text-base text-primary-foreground gap-2 glow-primary hover:opacity-90"
              >
                Começar Agora <ArrowRight size={18} />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="gap-2 px-8 text-base">
                Ver Recursos
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Tudo que você precisa</h2>
            <p className="mt-3 text-muted-foreground">Recursos poderosos para controlar sua vida financeira.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:glow-sm"
              >
                <div className="mb-4 inline-flex rounded-xl bg-gradient-primary p-2.5 text-primary-foreground">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
