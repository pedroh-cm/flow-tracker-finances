import type { Metadata } from "next";

import { InvestmentsMfePage } from "./investments-mfe";

export const metadata: Metadata = {
  title: "Investimentos",
  description: "Acompanhe sua carteira de investimentos, rentabilidade e distribuição de ativos.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvestmentsRoutePage() {
  return <InvestmentsMfePage />;
}
