import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginPage } from "@/src/views/pages/login/login-page";

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
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
