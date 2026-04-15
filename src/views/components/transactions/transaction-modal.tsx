"use client";

import { useState } from "react";
import { X } from "lucide-react";

import {
  Transaction,
  TransactionType,
  TransactionCategory,
  typeLabels,
  categoryLabels,
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

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Transaction, "id">) => void;
  transaction?: Transaction | null;
}

const defaultForm = {
  type: "payment" as TransactionType,
  description: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  category: "other" as TransactionCategory,
};

const getInitialForm = (transaction?: Transaction | null) =>
  transaction
    ? {
        type: transaction.type,
        description: transaction.description,
        amount: Math.abs(transaction.amount).toString(),
        date: transaction.date,
        category: transaction.category,
      }
    : defaultForm;

export function TransactionModal({ open, onClose, onSave, transaction }: TransactionModalProps) {
  if (!open) return null;

  return (
    <TransactionModalContent
      key={transaction?.id ?? "new-transaction"}
      onClose={onClose}
      onSave={onSave}
      transaction={transaction}
    />
  );
}

type TransactionModalContentProps = Omit<TransactionModalProps, "open">;

function TransactionModalContent({ onClose, onSave, transaction }: TransactionModalContentProps) {
  const [form, setForm] = useState(() => getInitialForm(transaction));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.description.trim()) nextErrors.description = "Descrição obrigatória";
    if (!form.amount || Number(form.amount) <= 0) nextErrors.amount = "Valor deve ser maior que 0";
    if (!form.date) nextErrors.date = "Data obrigatória";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const amount = Number(form.amount);
    const signedAmount = form.type === "deposit" ? amount : -amount;

    onSave({
      type: form.type,
      description: form.description,
      amount: signedAmount,
      date: form.date,
      category: form.category,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="mx-4 w-full max-w-lg animate-fade-in rounded-xl border border-border bg-card p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-bold text-card-foreground">
            {transaction ? "Editar Transação" : "Nova Transação"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tipo</Label>
              <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value as TransactionType })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(typeLabels) as TransactionType[]).map((type) => (
                    <SelectItem key={type} value={type}>
                      {typeLabels[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Categoria</Label>
              <Select
                value={form.category}
                onValueChange={(value) => setForm({ ...form, category: value as TransactionCategory })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(categoryLabels) as TransactionCategory[]).map((category) => (
                    <SelectItem key={category} value={category}>
                      {categoryLabels[category]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Descrição</Label>
            <Input
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="Ex: Supermercado"
            />
            {errors.description ? <p className="mt-1 text-xs text-destructive">{errors.description}</p> : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Valor (R$)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={form.amount}
                onChange={(event) => setForm({ ...form, amount: event.target.value })}
                placeholder="0,00"
              />
              {errors.amount ? <p className="mt-1 text-xs text-destructive">{errors.amount}</p> : null}
            </div>
            <div>
              <Label>Data</Label>
              <Input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
              {errors.date ? <p className="mt-1 text-xs text-destructive">{errors.date}</p> : null}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{transaction ? "Salvar" : "Adicionar"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
