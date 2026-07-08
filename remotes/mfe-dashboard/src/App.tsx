import { Providers } from "@/src/app/providers";
import { DashboardPage } from "@/src/views/pages/dashboard/dashboard-page";

/**
 * Dashboard Module — exposto via Module Federation como `mfe_dashboard/DashboardModule`
 */
export default function DashboardModule() {
  return (
    <Providers>
      <DashboardPage />
    </Providers>
  );
}
