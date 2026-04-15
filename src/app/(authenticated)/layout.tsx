import { ProtectedRoute } from "@/src/views/components/auth/protected-route";
import { AppLayoutShell } from "@/src/views/components/layout/app-layout-shell";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AppLayoutShell>{children}</AppLayoutShell>
    </ProtectedRoute>
  );
}
