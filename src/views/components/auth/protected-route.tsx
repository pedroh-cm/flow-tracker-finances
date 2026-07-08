"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/src/viewmodels/stores/auth-store";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, hasHydrated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated || isLoading) return;

    if (!isAuthenticated) {
      const encodedPath = encodeURIComponent(pathname);
      router.replace(`/login?next=${encodedPath}`);
    }
  }, [hasHydrated, isAuthenticated, isLoading, pathname, router]);

  if (!hasHydrated || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Carregando sessão" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
