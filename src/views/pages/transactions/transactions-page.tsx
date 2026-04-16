"use client";

import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Pencil, Plus, Search, Trash2 } from "lucide-react";

import {
  categoryColors,
  categoryLabels,
  Transaction,
  TransactionType,
  typeLabels,
} from "@/src/models/entities/transaction";
import { useTransactionStore } from "@/src/viewmodels/stores/transaction-store";
import { TransactionModal } from "@/src/views/components/transactions/transaction-modal";
import { ExportPdfButton } from "@/src/views/components/transactions/export-pdf-button";
import { Button } from "@/src/views/components/ui/button";
import { Input } from "@/src/views/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/views/components/ui/form";

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function TransactionsPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactionStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => typeFilter === "all" || transaction.type === typeFilter)
      .filter((transaction) => transaction.description.toLowerCase().includes(search.toLowerCase()))
      .sort((first, second) => second.date.localeCompare(first.date));
  }, [search, transactions, typeFilter]);

  const handleCreate = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      deleteTransaction(id);
    }
  };

  const handleSave = (data: Omit<Transaction, "id">) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
      setEditingTransaction(null);
      return;
    }

    addTransaction(data);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Transações</h1>
          <p className="text-sm text-muted-foreground">{filteredTransactions.length} transações encontradas</p>
        </div>
        <Button onClick={handleCreate} className="gap-2 bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus size={16} /> Nova Transação
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar transação..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-44">
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

        <ExportPdfButton transactions={filteredTransactions} fileName="despesas" />
      </div>

      <div className="animate-fade-in overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="hidden gap-4 border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:grid sm:grid-cols-[1fr_120px_100px_120px_96px]">
          <span>Descrição</span>
          <span>Categoria</span>
          <span>Data</span>
          <span className="text-right">Valor</span>
          <span className="text-right">Ações</span>
        </div>

        <div className="divide-y divide-border">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-col gap-2 px-5 py-3.5 sm:grid sm:grid-cols-[1fr_120px_100px_120px_96px] sm:items-center sm:gap-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    transaction.amount > 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {transaction.amount > 0 ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground sm:hidden">{typeLabels[transaction.type]}</p>
                </div>
              </div>

              <span className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[transaction.category]}`}>
                {categoryLabels[transaction.category]}
              </span>

              <span className="text-sm text-muted-foreground">
                {new Date(transaction.date).toLocaleDateString("pt-BR")}
              </span>

              <span
                className={`text-right text-sm font-semibold ${
                  transaction.amount > 0 ? "text-success" : "text-destructive"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {formatCurrency(transaction.amount)}
              </span>

              <div className="flex justify-end gap-1">
                <button
                  type="button"
                  onClick={() => handleEdit(transaction)}
                  className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={`Editar ${transaction.description}`}
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(transaction.id)}
                  className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label={`Excluir ${transaction.description}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {filteredTransactions.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">Nenhuma transação encontrada</div>
          ) : null}
        </div>
      </div>

      <TransactionModal
        open={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        transaction={editingTransaction}
      />
    </div>
  );
}
