"use client";

import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type BalancePoint = {
  date: string;
  balance: number;
};

type BalanceAreaChartProps = {
  data: BalancePoint[];
};

export function BalanceAreaChart({ data }: BalanceAreaChartProps) {
  return (
    <div
      className="animate-fade-in rounded-2xl border border-border bg-card p-5 shadow-sm"
      style={{ animationDelay: "0.25s" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display flex items-center gap-2 text-base font-semibold text-foreground">
          <TrendingUp size={18} className="text-primary" /> Evolução do Saldo
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(258, 90%, 62%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(258, 90%, 62%)" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              fontSize: 12,
              color: "hsl(var(--foreground))",
            }}
            formatter={(value: number) => [formatCurrency(value), "Saldo"]}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="hsl(258, 90%, 62%)"
            fill="url(#colorBalance)"
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
