import type { Metadata } from "next";

import { NotFoundPage } from "@/src/views/pages/not-found/not-found-page";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "A página que você está procurando não existe ou foi removida.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppNotFound() {
  return <NotFoundPage />;
}
