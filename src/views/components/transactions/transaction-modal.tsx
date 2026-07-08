"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";

import { suggestCategory } from "@/src/lib/category-suggestions";
import { TransactionFormValues, transactionFormSchema } from "@/src/lib/transaction-schema";
import { cn } from "@/src/lib/utils";
import {
  Transaction,
  TransactionCategory,
  TransactionType,
  categoryLabels,
  typeLabels,
} from "@/src/models/entities/transaction";
import { ReceiptUpload } from "@/src/views/components/transactions/receipt-upload";
import { Button } from "@/src/views/components/ui/button";
import { Calendar } from "@/src/views/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/views/components/ui/feedback/dialog";
import { Input, Label } from "@/src/views/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/views/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/views/components/ui/popover";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Transaction, "id">) => void;
  transaction?: Transaction | null;
}

const defaultValues: TransactionFormValues = {
  type: "payment",
  description: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  category: "other",
  receipt: undefined,
};

function getInitialValues(transaction?: Transaction | null): TransactionFormValues {
  if (!transaction) return defaultValues;

  return {
    type: transaction.type,
    description: transaction.description,
    amount: Math.abs(transaction.amount).toString(),
    date: transaction.date,
    category: transaction.category,
    receipt: transaction.receipt,
  };
}

export function TransactionModal({ open, onClose, onSave, transaction }: TransactionModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: getInitialValues(transaction),
  });

  const description = watch("description");
  const category = watch("category");
  const date = watch("date");
  const suggestedCategory = suggestCategory(description);

  useEffect(() => {
    if (!transaction && suggestedCategory && category === "other") {
      setValue("category", suggestedCategory);
    }
  }, [suggestedCategory, setValue, transaction, category]);

  useEffect(() => {
    if (open) {
      reset(getInitialValues(transaction));
    }
  }, [open, transaction, reset]);

  const onSubmit = (values: TransactionFormValues) => {
    const amount = Number(values.amount);
    const signedAmount = values.type === "deposit" ? amount : -amount;

    onSave({
      type: values.type,
      description: values.description,
      amount: signedAmount,
      date: values.date,
      category: values.category,
      receipt: values.receipt,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{transaction ? "Editar Transação" : "Nova Transação"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="transaction-type">Tipo</Label>
              <Select
                value={watch("type")}
                onValueChange={(value) => setValue("type", value as TransactionType)}
              >
                <SelectTrigger id="transaction-type">
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

            <div className="space-y-1.5">
              <Label htmlFor="transaction-category">Categoria</Label>
              <Select
                value={category}
                onValueChange={(value) => setValue("category", value as TransactionCategory)}
              >
                <SelectTrigger id="transaction-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(categoryLabels) as TransactionCategory[]).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {categoryLabels[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {suggestedCategory && suggestedCategory !== category ? (
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                  onClick={() => setValue("category", suggestedCategory)}
                >
                  <Sparkles size={12} />
                  Sugestão: {categoryLabels[suggestedCategory]}
                </button>
              ) : null}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="transaction-description">Descrição</Label>
            <Input
              id="transaction-description"
              placeholder="Ex: Supermercado"
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-xs text-destructive" role="alert">
                {errors.description.message}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="transaction-amount">Valor (R$)</Label>
              <Input
                id="transaction-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                {...register("amount")}
              />
              {errors.amount ? (
                <p className="text-xs text-destructive" role="alert">
                  {errors.amount.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="transaction-date">Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    id="transaction-date"
                    type="button"
                    className={cn(
                      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring",
                      !date && "text-muted-foreground",
                    )}
                  >
                    {date ? format(parseISO(date), "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date ? parseISO(date) : undefined}
                    onSelect={(day) => setValue("date", day ? format(day, "yyyy-MM-dd") : "")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date ? (
                <p className="text-xs text-destructive" role="alert">
                  {errors.date.message}
                </p>
              ) : null}
            </div>
          </div>

          <ReceiptUpload
            value={watch("receipt")}
            onChange={(base64) => setValue("receipt", base64)}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{transaction ? "Salvar" : "Adicionar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
