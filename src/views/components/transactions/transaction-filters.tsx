"use client";

import { Filter, X } from "lucide-react";

import { TransactionFilters } from "@/src/hooks/use-transaction-filters";
import {
  categoryLabels,
  TransactionCategory,
  TransactionType,
  typeLabels,
} from "@/src/models/entities/transaction";
import { Button } from "@/src/views/components/ui/button";
import { Input } from "@/src/views/components/ui/form";
import { Label } from "@/src/views/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/views/components/ui/form";

type TransactionFiltersPanelProps = {
  filters: TransactionFilters;
  onChange: (filters: TransactionFilters) => void;
  onClear: () => void;
  activeFilterCount: number;
};

export function TransactionFiltersPanel({
  filters,
  onChange,
  onClear,
  activeFilterCount,
}: TransactionFiltersPanelProps) {
  const update = (partial: Partial<TransactionFilters>) => onChange({ ...filters, ...partial });

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Filter size={16} className="text-primary" />
          Filtros avançados
          {activeFilterCount > 0 ? (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{activeFilterCount}</span>
          ) : null}
        </div>
        {activeFilterCount > 0 ? (
          <Button type="button" variant="ghost" size="sm" onClick={onClear} className="gap-1 text-muted-foreground">
            <X size={14} /> Limpar
          </Button>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="filter-type">Tipo</Label>
          <Select value={filters.type} onValueChange={(value) => update({ type: value as TransactionType | "all" })}>
            <SelectTrigger id="filter-type">
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {(Object.keys(typeLabels) as TransactionType[]).map((type) => (
                <SelectItem key={type} value={type}>
                  {typeLabels[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="filter-category">Categoria</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => update({ category: value as TransactionCategory | "all" })}
          >
            <SelectTrigger id="filter-category">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {(Object.keys(categoryLabels) as TransactionCategory[]).map((category) => (
                <SelectItem key={category} value={category}>
                  {categoryLabels[category]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="filter-date-from">Data inicial</Label>
          <Input
            id="filter-date-from"
            type="date"
            value={filters.dateFrom}
            onChange={(event) => update({ dateFrom: event.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="filter-date-to">Data final</Label>
          <Input
            id="filter-date-to"
            type="date"
            value={filters.dateTo}
            onChange={(event) => update({ dateTo: event.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="filter-min-amount">Valor mínimo (R$)</Label>
          <Input
            id="filter-min-amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0,00"
            value={filters.minAmount}
            onChange={(event) => update({ minAmount: event.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="filter-max-amount">Valor máximo (R$)</Label>
          <Input
            id="filter-max-amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0,00"
            value={filters.maxAmount}
            onChange={(event) => update({ maxAmount: event.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
