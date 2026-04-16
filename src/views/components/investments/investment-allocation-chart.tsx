"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type InvestmentAllocationChartProps = {
  investments: Array<{
    name: string;
    type: string;
    value: number;
  }>;
};

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
];

export function InvestmentAllocationChart({
  investments,
}: InvestmentAllocationChartProps) {
  const data = investments.map((inv) => ({
    name: inv.type,
    value: inv.value,
  }));

  // Agrupar por tipo
  const groupedData = data.reduce(
    (acc, item) => {
      const existing = acc.find((a) => a.name === item.name);
      if (existing) {
        existing.value += item.value;
      } else {
        acc.push(item);
      }
      return acc;
    },
    [] as Array<{ name: string; value: number }>,
  );

  const total = groupedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 font-display text-base font-semibold text-foreground">
        Alocação por Tipo de Investimento
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={groupedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {groupedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) =>
              value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
            }
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {groupedData.map((item, idx) => (
          <div key={item.name} className="space-y-1">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {((item.value / total) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              {item.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
