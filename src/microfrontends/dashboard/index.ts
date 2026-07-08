/**
 * Dashboard Microfrontend — módulo independente com API pública.
 * Pode ser carregado via dynamic import (code splitting) ou Module Federation.
 */
export { DashboardPage as DashboardModule } from "@/src/views/pages/dashboard/dashboard-page";
export { DASHBOARD_MFE } from "@/src/microfrontends/shared/registry";
