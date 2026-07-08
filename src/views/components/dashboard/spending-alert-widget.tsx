"use client";

import { AlertTriangle } from "lucide-react";

type SpendingAlertWidgetProps = {
  totalExpenses: number;
  limit: number;
};

export function SpendingAlertWidget({ totalExpenses, limit }: SpendingAlertWidgetProps) {
  const percentage = limit > 0 ? Math.round((totalExpenses / limit) * 100) : 0;
  const isOverLimit = totalExpenses > limit;
  const isNearLimit = percentage >= 80 && !isOverLimit;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  if (!isOverLimit && !isNearLimit) {
    return (
      <section
        className="animate-fade-in rounded-xl border border-border bg-card p-5 shadow-sm"
        aria-label="Alertas de gastos"
      >
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle size={18} className="text-success" />
          <h2 className="font-display text-base font-semibold text-foreground">Alertas de Gastos</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Gastos dentro do limite — {formatCurrency(totalExpenses)} de {formatCurrency(limit)} ({percentage}%)
        </p>
      </section>
    );
  }

  return (
    <section
      className={`animate-fade-in rounded-xl border p-5 shadow-sm ${
        isOverLimit ? "border-destructive/50 bg-destructive/5" : "border-warning/50 bg-warning/5"
      }`}
      aria-label="Alertas de gastos"
      role="alert"
    >
      <div className="mb-2 flex items-center gap-2">
        <AlertTriangle size={18} className={isOverLimit ? "text-destructive" : "text-warning"} />
        <h2 className="font-display text-base font-semibold text-foreground">Alertas de Gastos</h2>
      </div>
      <p className={`text-sm ${isOverLimit ? "text-destructive" : "text-warning"}`}>
        {isOverLimit
          ? `Limite ultrapassado! Gastos de ${formatCurrency(totalExpenses)} excedem o limite de ${formatCurrency(limit)}.`
          : `Atenção: você já utilizou ${percentage}% do limite mensal (${formatCurrency(totalExpenses)} de ${formatCurrency(limit)}).`}
      </p>
    </section>
  );
}
