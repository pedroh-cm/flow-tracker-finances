"use client";

import { ReactNode, useMemo } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { initialTransactions, Transaction } from "@/src/models/entities/transaction";
import { MFE_EVENTS, mfeEventBus } from "@/src/microfrontends/shared/event-bus";

type TransactionStoreState = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
};

const createTransactionId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `tx-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const useTransactionBaseStore = create<TransactionStoreState>()(
  persist(
    (set) => ({
      transactions: initialTransactions,
      addTransaction: (transaction) => {
        const nextTransaction: Transaction = {
          ...transaction,
          id: createTransactionId(),
        };

        set((state) => ({
          transactions: [nextTransaction, ...state.transactions],
        }));
        mfeEventBus.emit(MFE_EVENTS.TRANSACTION_CREATED, nextTransaction);
      },
      updateTransaction: (id, transaction) => {
        set((state) => ({
          transactions: state.transactions.map((currentTransaction) =>
            currentTransaction.id === id ? { ...transaction, id } : currentTransaction,
          ),
        }));
        mfeEventBus.emit(MFE_EVENTS.TRANSACTION_UPDATED, { id, ...transaction });
      },
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((currentTransaction) => currentTransaction.id !== id),
        }));
        mfeEventBus.emit(MFE_EVENTS.TRANSACTION_DELETED, { id });
      },
    }),
    {
      name: "flowtrack-transactions",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        transactions: state.transactions,
      }),
    },
  ),
);

type TransactionStoreProviderProps = {
  children: ReactNode;
};

export function TransactionStoreProvider({ children }: TransactionStoreProviderProps) {
  return <>{children}</>;
}

export function useTransactionStore() {
  const transactions = useTransactionBaseStore((state) => state.transactions);
  const addTransaction = useTransactionBaseStore((state) => state.addTransaction);
  const updateTransaction = useTransactionBaseStore((state) => state.updateTransaction);
  const deleteTransaction = useTransactionBaseStore((state) => state.deleteTransaction);

  const balance = useMemo(() => transactions.reduce((sum, transaction) => sum + transaction.amount, 0), [transactions]);

  return {
    transactions,
    balance,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
