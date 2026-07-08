import { useMemo, useState } from "react";

import { Transaction, TransactionCategory, TransactionType } from "@/src/models/entities/transaction";

export type TransactionFilters = {
  search: string;
  type: TransactionType | "all";
  category: TransactionCategory | "all";
  dateFrom: string;
  dateTo: string;
  minAmount: string;
  maxAmount: string;
};

export const defaultFilters: TransactionFilters = {
  search: "",
  type: "all",
  category: "all",
  dateFrom: "",
  dateTo: "",
  minAmount: "",
  maxAmount: "",
};

export function useTransactionFilters(transactions: Transaction[]) {
  const [filters, setFilters] = useState<TransactionFilters>(defaultFilters);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => filters.type === "all" || transaction.type === filters.type)
      .filter((transaction) => filters.category === "all" || transaction.category === filters.category)
      .filter((transaction) => {
        if (!filters.search) return true;
        return transaction.description.toLowerCase().includes(filters.search.toLowerCase());
      })
      .filter((transaction) => {
        if (filters.dateFrom && transaction.date < filters.dateFrom) return false;
        if (filters.dateTo && transaction.date > filters.dateTo) return false;
        return true;
      })
      .filter((transaction) => {
        const absAmount = Math.abs(transaction.amount);
        if (filters.minAmount && absAmount < Number(filters.minAmount)) return false;
        if (filters.maxAmount && absAmount > Number(filters.maxAmount)) return false;
        return true;
      })
      .sort((first, second) => second.date.localeCompare(first.date));
  }, [filters, transactions]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.type !== "all") count++;
    if (filters.category !== "all") count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    if (filters.minAmount) count++;
    if (filters.maxAmount) count++;
    return count;
  }, [filters]);

  const clearFilters = () => setFilters(defaultFilters);

  return {
    filters,
    setFilters,
    filteredTransactions,
    activeFilterCount,
    clearFilters,
  };
}
