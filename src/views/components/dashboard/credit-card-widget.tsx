"use client";

import { CreditCard } from "lucide-react";

type CreditCardInfo = {
  brand: string;
  last4: string;
  name: string;
  expiry: string;
  limit: number;
  used: number;
  gradient: string;
};

const formatCurrency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type CreditCardWidgetProps = {
  card: CreditCardInfo;
};

export function CreditCardWidget({ card }: CreditCardWidgetProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${card.gradient} p-5 text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/5" />

      <div className="flex items-start justify-between">
        <p className="text-xs font-medium opacity-80">{card.brand}</p>
        <CreditCard size={20} className="opacity-60" />
      </div>
      <p className="mt-4 font-display text-lg font-bold tracking-[0.2em]">
        •••• •••• •••• {card.last4}
      </p>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase opacity-60">Titular</p>
          <p className="text-xs font-semibold">{card.name}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase opacity-60">Validade</p>
          <p className="text-xs font-semibold">{card.expiry}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-[10px] opacity-70">
          <span>Usado: {formatCurrency(card.used)}</span>
          <span>Limite: {formatCurrency(card.limit)}</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white/80 transition-all duration-700"
            style={{ width: `${(card.used / card.limit) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
