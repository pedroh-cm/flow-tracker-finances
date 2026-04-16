"use client";

import { useMemo } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { useTransactionStore } from "@/src/viewmodels/stores/transaction-store";
import { InvestmentAllocationChart } from "@/src/views/components/investments/investment-allocation-chart";
import { InvestmentCapacity } from "@/src/views/components/investments/investment-capacity";

const investments = [
  { name: "Tesouro Selic 2029", type: "Renda Fixa", value: 12500, change: 1.2 },
  { name: "CDB Banco Inter 120% CDI", type: "Renda Fixa", value: 8300, change: 0.9 },
  { name: "IVVB11 — S&P 500", type: "ETF", value: 5200, change: -2.1 },
  { name: "PETR4 — Petrobras", type: "Ação", value: 3100, change: 3.5 },
  { name: "KNRI11 — FII Kinea", type: "FII", value: 4800, change: 0.4 },
];

const total = investments.reduce((sum, investment) => sum + investment.value, 0);

export function InvestmentsPage() {
  const { transactions, balance } = useTransactionStore();

  // Calcular renda mensal (transações positivas)
  const monthlyIncome = useMemo(() => {
    return transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Investimentos</h1>
        <p className="text-sm text-muted-foreground">Acompanhe sua carteira</p>
      </div>

      <div className="animate-fade-in rounded-xl border border-border bg-card p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Patrimônio Investido</p>
        <p className="mt-1 text-3xl font-bold text-foreground">
          {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </p>
      </div>

      {/* Gráficos de Análise */}
      <div className="animate-fade-in space-y-6" style={{ animationDelay: "0.1s" }}>
        <InvestmentAllocationChart investments={investments} />
        <InvestmentCapacity
          totalInvested={total}
          monthlyIncome={monthlyIncome}
          totalBalance={balance}
        />
      </div>

      <div className="animate-fade-in space-y-3" style={{ animationDelay: "0.15s" }}>
        {investments.map((investment) => (
          <div
            key={investment.name}
            className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 shadow-sm"
          >
            <div>
              <p className="text-sm font-semibold text-card-foreground">{investment.name}</p>
              <p className="text-xs text-muted-foreground">{investment.type}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-card-foreground">
                {investment.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
              <p
                className={`flex items-center justify-end gap-1 text-xs font-medium ${
                  investment.change >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {investment.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {investment.change >= 0 ? "+" : ""}
                {investment.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
