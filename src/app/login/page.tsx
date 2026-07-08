import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginMfePage } from "./login-mfe";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta FlowTrack para gerenciar suas finanças pessoais.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginRoutePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
          Carregando...
        </div>
      }
    >
      <LoginMfePage />
    </Suspense>
  );
}
