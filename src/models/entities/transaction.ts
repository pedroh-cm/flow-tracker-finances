export type TransactionType = "deposit" | "transfer" | "withdrawal" | "payment";

export type TransactionCategory =
  | "salary"
  | "food"
  | "transport"
  | "entertainment"
  | "bills"
  | "health"
  | "education"
  | "shopping"
  | "other";

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
  category: TransactionCategory;
}

export const initialTransactions: Transaction[] = [
  { id: "1", type: "deposit", description: "Salário mensal", amount: 8500, date: "2025-04-01", category: "salary" },
  { id: "2", type: "payment", description: "Aluguel apartamento", amount: -2200, date: "2025-04-02", category: "bills" },
  { id: "3", type: "payment", description: "Supermercado Extra", amount: -347.8, date: "2025-04-03", category: "food" },
  { id: "4", type: "transfer", description: "Transferência para poupança", amount: -1000, date: "2025-04-04", category: "other" },
  { id: "5", type: "payment", description: "Netflix + Spotify", amount: -69.8, date: "2025-04-05", category: "entertainment" },
  { id: "6", type: "withdrawal", description: "Saque ATM", amount: -200, date: "2025-04-06", category: "other" },
  { id: "7", type: "payment", description: "Uber / 99", amount: -85.5, date: "2025-04-07", category: "transport" },
  { id: "8", type: "deposit", description: "Freelance design", amount: 1200, date: "2025-04-08", category: "salary" },
  { id: "9", type: "payment", description: "Farmácia", amount: -67.3, date: "2025-04-09", category: "health" },
  { id: "10", type: "payment", description: "Curso Udemy", amount: -29.9, date: "2025-04-10", category: "education" },
  { id: "11", type: "payment", description: "iFood", amount: -52.9, date: "2025-04-11", category: "food" },
  { id: "12", type: "deposit", description: "Cashback cartão", amount: 45.2, date: "2025-04-12", category: "other" },
];

export const typeLabels: Record<TransactionType, string> = {
  deposit: "Depósito",
  transfer: "Transferência",
  withdrawal: "Saque",
  payment: "Pagamento",
};

export const categoryLabels: Record<TransactionCategory, string> = {
  salary: "Salário",
  food: "Alimentação",
  transport: "Transporte",
  entertainment: "Entretenimento",
  bills: "Contas",
  health: "Saúde",
  education: "Educação",
  shopping: "Compras",
  other: "Outros",
};

export const categoryColors: Record<TransactionCategory, string> = {
  salary: "bg-success/10 text-success",
  food: "bg-warning/10 text-warning",
  transport: "bg-primary/10 text-primary",
  entertainment: "bg-accent text-accent-foreground",
  bills: "bg-destructive/10 text-destructive",
  health: "bg-success/10 text-success",
  education: "bg-primary/10 text-primary",
  shopping: "bg-warning/10 text-warning",
  other: "bg-muted text-muted-foreground",
};
