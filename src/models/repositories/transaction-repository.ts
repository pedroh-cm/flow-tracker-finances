import { Transaction } from "@/src/models/entities/transaction";

export interface TransactionRepository {
  list(): Transaction[];
  create(input: Omit<Transaction, "id">): Transaction;
  update(id: string, input: Omit<Transaction, "id">): Transaction[];
  delete(id: string): Transaction[];
}
