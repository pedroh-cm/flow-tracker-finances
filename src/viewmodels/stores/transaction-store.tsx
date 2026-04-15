"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { Transaction } from "@/src/models/entities/transaction";
import { MemoryTransactionRepository } from "@/src/models/services/memory-transaction-repository";

type TransactionStoreContextValue = {
  transactions: Transaction[];
  balance: number;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
};

const TransactionStoreContext = createContext<TransactionStoreContextValue | null>(null);
const transactionRepository = new MemoryTransactionRepository();

type TransactionStoreProviderProps = {
  children: ReactNode;
};

export function TransactionStoreProvider({ children }: TransactionStoreProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => transactionRepository.list());

  const contextValue = useMemo(() => {
    const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    return {
      transactions,
      balance,
      addTransaction: (transaction: Omit<Transaction, "id">) => {
        transactionRepository.create(transaction);
        setTransactions(transactionRepository.list());
      },
      updateTransaction: (id: string, transaction: Omit<Transaction, "id">) => {
        setTransactions(transactionRepository.update(id, transaction));
      },
      deleteTransaction: (id: string) => {
        setTransactions(transactionRepository.delete(id));
      },
    };
  }, [transactions]);

  return <TransactionStoreContext.Provider value={contextValue}>{children}</TransactionStoreContext.Provider>;
}

export function useTransactionStore() {
  const context = useContext(TransactionStoreContext);
  if (!context) {
    throw new Error("useTransactionStore must be used within TransactionStoreProvider");
  }

  return context;
}
