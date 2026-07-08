/**
 * Transactions Microfrontend — módulo independente com API pública.
 * Pode ser carregado via dynamic import (code splitting) ou Module Federation.
 */
export { TransactionsPage as TransactionsModule } from "@/src/views/pages/transactions/transactions-page";
export { TRANSACTIONS_MFE } from "@/src/microfrontends/shared/registry";
