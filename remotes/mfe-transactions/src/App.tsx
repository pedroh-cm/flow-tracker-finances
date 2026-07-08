import { Providers } from "@/src/app/providers";
import { TransactionsPage } from "@/src/views/pages/transactions/transactions-page";

/**
 * Transactions Module — exposto via Module Federation como `mfe_transactions/TransactionsModule`
 */
export default function TransactionsModule() {
  return (
    <Providers>
      <TransactionsPage />
    </Providers>
  );
}
