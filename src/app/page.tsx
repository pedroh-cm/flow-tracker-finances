import type { Metadata } from "next";

import { LandingPage } from "@/src/views/pages/landing/landing-page";

export const metadata: Metadata = {
  title: "FlowTrack — Gestão Financeira Inteligente",
  description:
    "Controle suas finanças com inteligência. Gerencie transações, acompanhe investimentos e visualize seu patrimônio em tempo real.",
  openGraph: {
    title: "FlowTrack — Gestão Financeira Inteligente",
    description:
      "Controle suas finanças com inteligência. Gerencie transações, acompanhe investimentos e visualize seu patrimônio em tempo real.",
    url: "https://flow-tracker-finances.vercel.app",
  },
};

export default function Home() {
  return <LandingPage />;
}
