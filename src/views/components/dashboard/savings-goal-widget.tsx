"use client";

import { Target } from "lucide-react";

type SavingsGoalWidgetProps = {
  currentSavings: number;
  goal: number;
};

export function SavingsGoalWidget({ currentSavings, goal }: SavingsGoalWidgetProps) {
  const progress = goal > 0 ? Math.min(100, Math.round((currentSavings / goal) * 100)) : 0;
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <section
      className="animate-fade-in rounded-xl border border-border bg-card p-5 shadow-sm"
      aria-label="Meta de economia"
    >
      <div className="mb-4 flex items-center gap-2">
        <Target size={18} className="text-primary" />
        <h2 className="font-display text-base font-semibold text-foreground">Meta de Economia</h2>
      </div>

      <div className="mb-2 flex items-end justify-between">
        <p className="text-2xl font-bold text-foreground">{formatCurrency(currentSavings)}</p>
        <p className="text-sm text-muted-foreground">de {formatCurrency(goal)}</p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-success transition-all duration-500"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso da meta: ${progress}%`}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{progress}% da meta mensal atingida</p>
    </section>
  );
}
