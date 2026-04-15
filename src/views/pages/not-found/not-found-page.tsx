"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Ghost } from "lucide-react";

import { Button } from "@/src/views/components/ui/button";

export function NotFoundPage() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-125 w-125 -translate-x-1/2 rounded-full bg-gradient-primary opacity-[0.06] blur-[120px]" />
      </div>

      <div className="relative text-center animate-fade-in">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
          <Ghost size={40} className="text-primary" />
        </div>
        <h1 className="font-display text-7xl font-bold text-gradient">404</h1>
        <p className="mt-4 text-xl font-medium text-foreground">Página não encontrada</p>
        <p className="mt-2 text-sm text-muted-foreground">
          A rota <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-foreground">{pathname}</code> não
          existe.
        </p>
        <Link href="/" className="mt-8 inline-block">
          <Button variant="outline" className="gap-2">
            <ArrowLeft size={16} /> Voltar ao Início
          </Button>
        </Link>
      </div>
    </div>
  );
}
