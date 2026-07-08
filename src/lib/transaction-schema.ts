import { z } from "zod";

export const transactionFormSchema = z.object({
  type: z.enum(["deposit", "transfer", "withdrawal", "payment"]),
  description: z
    .string()
    .min(2, "Descrição deve ter pelo menos 2 caracteres")
    .max(120, "Descrição deve ter no máximo 120 caracteres"),
  amount: z
    .string()
    .min(1, "Valor obrigatório")
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, "Valor deve ser maior que 0")
    .refine((value) => Number(value) <= 999_999_999, "Valor excede o limite permitido"),
  date: z.string().min(1, "Data obrigatória"),
  category: z.enum(["salary", "food", "transport", "entertainment", "bills", "health", "education", "shopping", "other"]),
  receipt: z.string().optional(),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
