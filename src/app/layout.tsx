import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flow-tracker-finances.vercel.app"),
  title: {
    default: "FlowTrack — Gestão Financeira Inteligente",
    template: "%s | FlowTrack",
  },
  description:
    "Gerencie suas finanças pessoais com facilidade. Acompanhe transações, investimentos e tome decisões financeiras inteligentes.",
  keywords: ["finanças pessoais", "gestão financeira", "controle de gastos", "investimentos", "transações"],
  authors: [{ name: "FlowTrack" }],
  creator: "FlowTrack",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://flow-tracker-finances.vercel.app",
    siteName: "FlowTrack",
    title: "FlowTrack — Gestão Financeira Inteligente",
    description:
      "Gerencie suas finanças pessoais com facilidade. Acompanhe transações, investimentos e tome decisões financeiras inteligentes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowTrack — Gestão Financeira Inteligente",
    description:
      "Gerencie suas finanças pessoais com facilidade. Acompanhe transações, investimentos e tome decisões financeiras inteligentes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
