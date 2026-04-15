import { initialTransactions, Transaction } from "@/src/models/entities/transaction";
import { TransactionRepository } from "@/src/models/repositories/transaction-repository";

export class MemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[];

  constructor(seedTransactions: Transaction[] = initialTransactions) {
    this.transactions = [...seedTransactions];
  }

  list(): Transaction[] {
    return [...this.transactions];
  }

  create(input: Omit<Transaction, "id">): Transaction {
    const transaction: Transaction = {
      ...input,
      id: crypto.randomUUID(),
    };

    this.transactions = [transaction, ...this.transactions];
    return transaction;
  }

  update(id: string, input: Omit<Transaction, "id">): Transaction[] {
    this.transactions = this.transactions.map((transaction) =>
      transaction.id === id ? { ...input, id } : transaction,
    );

    return [...this.transactions];
  }

  delete(id: string): Transaction[] {
    this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
    return [...this.transactions];
  }
}
