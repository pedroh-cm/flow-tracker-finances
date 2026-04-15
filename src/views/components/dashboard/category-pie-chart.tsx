"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const PIE_COLORS = [
  "hsl(258, 90%, 62%)",
  "hsl(152, 60%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 51%)",
  "hsl(200, 95%, 55%)",
  "hsl(320, 70%, 55%)",
  "hsl(45, 90%, 55%)",
  "hsl(170, 60%, 45%)",
  "hsl(220, 15%, 55%)",
];

type PieSlice = {
  name: string;
  value: number;
};

type CategoryPieChartProps = {
  data: PieSlice[];
};

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
    <div
      className="animate-fade-in rounded-2xl border border-border bg-card p-5 shadow-sm"
      style={{ animationDelay: "0.35s" }}
    >
      <h2 className="font-display mb-4 text-base font-semibold text-foreground">
        Despesas por Categoria
      </h2>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="50%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {data.slice(0, 5).map((item, i) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-semibold text-foreground">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
