"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type IncomeExpensePoint = {
  date: string;
  income: number;
  expense: number;
};

type IncomeExpenseBarChartProps = {
  data: IncomeExpensePoint[];
};

export function IncomeExpenseBarChart({ data }: IncomeExpenseBarChartProps) {
  return (
    <div
      className="animate-fade-in rounded-2xl border border-border bg-card p-5 shadow-sm"
      style={{ animationDelay: "0.3s" }}
    >
      <h2 className="font-display mb-4 text-base font-semibold text-foreground">
        Receitas vs Despesas
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              fontSize: 12,
              color: "hsl(var(--foreground))",
            }}
            formatter={(value: number) => [formatCurrency(value)]}
          />
          <Bar dataKey="income" fill="hsl(152, 60%, 40%)" radius={[6, 6, 0, 0]} name="Receita" />
          <Bar dataKey="expense" fill="hsl(0, 72%, 51%)" radius={[6, 6, 0, 0]} name="Despesa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
