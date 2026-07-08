import type { Metadata } from "next";

import { TransactionsMfePage } from "./transactions-mfe";

export const metadata: Metadata = {
  title: "Transações",
  description: "Gerencie todas as suas transações financeiras. Filtre por tipo, pesquise por descrição e mantenha seu histórico organizado.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TransactionsRoutePage() {
  return <TransactionsMfePage />;
}
