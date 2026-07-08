import { Suspense } from "react";

import { Providers } from "@/src/app/providers";
import { LoginPage } from "@/src/views/pages/login/login-page";

/**
 * Auth Module — exposto via Module Federation como `mfe_auth/AuthModule`
 */
export default function AuthModule() {
  return (
    <Providers>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Carregando...</div>}>
        <LoginPage />
      </Suspense>
    </Providers>
  );
}
