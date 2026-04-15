"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { categoryColors, categoryLabels, typeLabels } from "@/src/models/entities/transaction";
import type { Transaction } from "@/src/models/entities/transaction";

const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type RecentTransactionsProps = {
  transactions: Transaction[];
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="animate-fade-in rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="font-display text-base font-semibold text-card-foreground">
          Últimas Transações
        </h2>
        <Link href="/transactions" className="text-xs font-medium text-primary hover:underline">
          Ver todas →
        </Link>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((t, i) => (
          <div
            key={t.id}
            className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-muted/30 animate-fade-in"
            style={{ animationDelay: `${0.45 + i * 0.05}s` }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  t.amount > 0
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {t.amount > 0 ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">{t.description}</p>
                <p className="text-xs text-muted-foreground">
                  {typeLabels[t.type]} · {new Date(t.date).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[t.category]}`}
              >
                {categoryLabels[t.category]}
              </span>
              <span
                className={`font-display text-sm font-semibold ${
                  t.amount > 0 ? "text-success" : "text-destructive"
                }`}
              >
                {t.amount > 0 ? "+" : ""}
                {formatCurrency(t.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
