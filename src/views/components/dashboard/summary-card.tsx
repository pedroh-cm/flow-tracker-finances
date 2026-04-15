"use client";

import { Eye, EyeOff } from "lucide-react";

type SummaryCardProps = {
  label: string;
  value: string;
  subtext: string;
  colorClass: string;
  icon: React.ReactNode;
  toggleable?: boolean;
  hidden?: boolean;
  onToggle?: () => void;
};

export function SummaryCard({
  label,
  value,
  subtext,
  colorClass,
  icon,
  toggleable = false,
  hidden = false,
  onToggle,
}: SummaryCardProps) {
  return (
    <div className="animate-fade-in rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md duration-300">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        {toggleable && onToggle && (
          <button
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={hidden ? "Mostrar valor" : "Ocultar valor"}
          >
            {hidden ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        )}
      </div>
      <p className={`font-display text-2xl font-bold ${colorClass}`}>
        {hidden ? "••••••" : value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{subtext}</p>
    </div>
  );
}
