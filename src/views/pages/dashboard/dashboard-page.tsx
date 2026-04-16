"use client";

import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, CreditCard, Plus, Wallet } from "lucide-react";

import { categoryLabels, type TransactionCategory } from "@/src/models/entities/transaction";
import { useTransactionStore } from "@/src/viewmodels/stores/transaction-store";
import { BalanceAreaChart } from "@/src/views/components/dashboard/balance-area-chart";
import { CategoryPieChart } from "@/src/views/components/dashboard/category-pie-chart";
import { CreditCardWidget } from "@/src/views/components/dashboard/credit-card-widget";
import { IncomeExpenseBarChart } from "@/src/views/components/dashboard/income-expense-bar-chart";
import { RecentTransactions } from "@/src/views/components/dashboard/recent-transactions";
import { SummaryCard } from "@/src/views/components/dashboard/summary-card";
import { TransactionModal } from "@/src/views/components/transactions/transaction-modal";
import { Button } from "@/src/views/components/ui/button";

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const cards = [
  {
    brand: "Mastercard",
    last4: "4821",
    name: "Pedro Henrique",
    expiry: "08/28",
    limit: 12000,
    used: 4350,
    gradient: "from-[hsl(258,90%,62%)] to-[hsl(200,95%,55%)]",
  },
  {
    brand: "Visa",
    last4: "7733",
    name: "Pedro Henrique",
    expiry: "11/27",
    limit: 8000,
    used: 2100,
    gradient: "from-[hsl(152,60%,40%)] to-[hsl(180,70%,40%)]",
  },
];

export function DashboardPage() {
  const { transactions, balance, addTransaction } = useTransactionStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const income = useMemo(
    () => transactions.filter((transaction) => transaction.amount > 0).reduce((sum, transaction) => sum + transaction.amount, 0),
    [transactions],
  );

  const expenses = useMemo(
    () => transactions.filter((transaction) => transaction.amount < 0).reduce((sum, transaction) => sum + transaction.amount, 0),
    [transactions],
  );

  const recentTransactions = useMemo(
    () => [...transactions].sort((first, second) => second.date.localeCompare(first.date)).slice(0, 5),
    [transactions],
  );

  const chartData = useMemo(() => {
    const sorted = [...transactions].sort((first, second) => first.date.localeCompare(second.date));
    let runningBalance = 0;
    const points = new Map<string, { income: number; expense: number; balance: number }>();

    for (const transaction of sorted) {
      runningBalance += transaction.amount;
      const existingPoint = points.get(transaction.date) ?? { income: 0, expense: 0, balance: 0 };

      if (transaction.amount > 0) {
        existingPoint.income += transaction.amount;
      } else {
        existingPoint.expense += Math.abs(transaction.amount);
      }

      existingPoint.balance = runningBalance;
      points.set(transaction.date, existingPoint);
    }

    return Array.from(points.entries()).map(([date, values]) => ({
      date: new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
      ...values,
    }));
  }, [transactions]);

  const pieData = useMemo(() => {
    const categoryMap = new Map<TransactionCategory, number>();

    for (const transaction of transactions) {
      if (transaction.amount < 0) {
        categoryMap.set(transaction.category, (categoryMap.get(transaction.category) ?? 0) + Math.abs(transaction.amount));
      }
    }

    return Array.from(categoryMap.entries())
      .map(([category, value]) => ({ name: categoryLabels[category], value }))
      .sort((first, second) => second.value - first.value);
  }, [transactions]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="animate-fade-in flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Visão geral das suas finanças</p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-gradient-primary glow-sm gap-2 text-primary-foreground hover:opacity-90"
        >
          <Plus size={16} /> Nova Transação
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Saldo Total"
          value={formatCurrency(balance)}
          subtext="Atualizado agora"
          colorClass="text-foreground"
          icon={
            <div className="rounded-lg bg-primary/10 p-2">
              <Wallet size={16} className="text-primary" />
            </div>
          }
          toggleable
          hidden={!showBalance}
          onToggle={() => setShowBalance((current) => !current)}
        />

        <div style={{ animationDelay: "0.1s" }}>
          <SummaryCard
            label="Receitas"
            value={formatCurrency(income)}
            subtext="+12% vs mês anterior"
            colorClass="text-success"
            icon={
              <div className="rounded-lg bg-success/10 p-2">
                <ArrowDownLeft size={16} className="text-success" />
              </div>
            }
            hidden={!showBalance}
          />
        </div>

        <div style={{ animationDelay: "0.2s" }}>
          <SummaryCard
            label="Despesas"
            value={formatCurrency(Math.abs(expenses))}
            subtext="-5% vs mês anterior"
            colorClass="text-destructive"
            icon={
              <div className="rounded-lg bg-destructive/10 p-2">
                <ArrowUpRight size={16} className="text-destructive" />
              </div>
            }
            hidden={!showBalance}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="animate-fade-in space-y-4 lg:col-span-2" style={{ animationDelay: "0.15s" }}>
          <h2 className="font-display flex items-center gap-2 text-base font-semibold text-foreground">
            <CreditCard size={18} className="text-primary" /> Meus Cartões
          </h2>
          {cards.map((card) => (
            <CreditCardWidget key={card.last4} card={card} />
          ))}
        </div>
        <div className="lg:col-span-3">
          <BalanceAreaChart data={chartData} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <IncomeExpenseBarChart data={chartData} />
        <CategoryPieChart data={pieData} />
      </div>

      <RecentTransactions transactions={recentTransactions} />

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addTransaction} />
    </div>
  );
}
