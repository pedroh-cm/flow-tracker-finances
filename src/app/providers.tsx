"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

import { AuthStoreProvider } from "@/src/viewmodels/stores/auth-store";
import { ThemeStoreProvider } from "@/src/viewmodels/stores/theme-store";
import { TransactionStoreProvider } from "@/src/viewmodels/stores/transaction-store";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeStoreProvider>
        <AuthStoreProvider>
          <TransactionStoreProvider>{children}</TransactionStoreProvider>
        </AuthStoreProvider>
      </ThemeStoreProvider>
    </QueryClientProvider>
  );
}