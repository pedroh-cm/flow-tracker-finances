"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/src/viewmodels/stores/auth-store";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isAuthenticated) {
      const encodedPath = encodeURIComponent(pathname);
      router.replace(`/login?next=${encodedPath}`);
    }
  }, [hasHydrated, isAuthenticated, pathname, router]);

  if (!hasHydrated || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
