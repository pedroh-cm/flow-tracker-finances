"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type DashboardWidgetId =
  | "summary"
  | "creditCards"
  | "balanceChart"
  | "incomeExpenseChart"
  | "categoryChart"
  | "recentTransactions"
  | "savingsGoal"
  | "spendingAlert";

export type DashboardWidget = {
  id: DashboardWidgetId;
  label: string;
  description: string;
  visible: boolean;
};

const defaultWidgets: DashboardWidget[] = [
  { id: "summary", label: "Resumo financeiro", description: "Saldo, receitas e despesas", visible: true },
  { id: "creditCards", label: "Meus cartões", description: "Cartões de crédito", visible: true },
  { id: "balanceChart", label: "Evolução do saldo", description: "Gráfico de área", visible: true },
  { id: "incomeExpenseChart", label: "Receitas vs despesas", description: "Gráfico de barras", visible: true },
  { id: "categoryChart", label: "Despesas por categoria", description: "Gráfico de pizza", visible: true },
  { id: "recentTransactions", label: "Transações recentes", description: "Últimas movimentações", visible: true },
  { id: "savingsGoal", label: "Meta de economia", description: "Progresso da meta mensal", visible: true },
  { id: "spendingAlert", label: "Alertas de gastos", description: "Avisos de limite de gastos", visible: true },
];

type DashboardStoreState = {
  widgets: DashboardWidget[];
  savingsGoal: number;
  spendingLimit: number;
  toggleWidget: (id: DashboardWidgetId) => void;
  setSavingsGoal: (value: number) => void;
  setSpendingLimit: (value: number) => void;
  resetWidgets: () => void;
  isWidgetVisible: (id: DashboardWidgetId) => boolean;
};

export const useDashboardStore = create<DashboardStoreState>()(
  persist(
    (set, get) => ({
      widgets: defaultWidgets,
      savingsGoal: 2000,
      spendingLimit: 5000,
      toggleWidget: (id) => {
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, visible: !widget.visible } : widget,
          ),
        }));
      },
      setSavingsGoal: (value) => set({ savingsGoal: value }),
      setSpendingLimit: (value) => set({ spendingLimit: value }),
      resetWidgets: () => set({ widgets: defaultWidgets }),
      isWidgetVisible: (id) => get().widgets.find((widget) => widget.id === id)?.visible ?? true,
    }),
    {
      name: "flowtrack-dashboard",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        widgets: state.widgets,
        savingsGoal: state.savingsGoal,
        spendingLimit: state.spendingLimit,
      }),
    },
  ),
);
