import type { Metadata } from "next";

import { DashboardPage } from "@/src/views/pages/dashboard/dashboard-page";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Visão geral das suas finanças: saldo atual, receitas, despesas e evolução patrimonial.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardRoutePage() {
  return <DashboardPage />;
}
