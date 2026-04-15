import type { Metadata } from "next";

import { InvestmentsPage } from "@/src/views/pages/investments/investments-page";

export const metadata: Metadata = {
  title: "Investimentos",
  description: "Acompanhe sua carteira de investimentos, rentabilidade e distribuição de ativos.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvestmentsRoutePage() {
  return <InvestmentsPage />;
}
