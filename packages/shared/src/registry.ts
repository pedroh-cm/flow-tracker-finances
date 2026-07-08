export type MicrofrontendManifest = {
  name: string;
  version: string;
  route: string;
  description: string;
  framework: "react";
  /** Module Federation remote name */
  mfName: string;
  /** Module Federation exposed module */
  mfExpose: string;
  /** Dev port */
  port: number;
};

export const AUTH_MFE: MicrofrontendManifest = {
  name: "auth",
  version: "1.0.0",
  route: "/login",
  description: "Autenticação e login seguro com JWT",
  framework: "react",
  mfName: "mfe_auth",
  mfExpose: "./AuthModule",
  port: 3001,
};

export const DASHBOARD_MFE: MicrofrontendManifest = {
  name: "dashboard",
  version: "1.0.0",
  route: "/dashboard",
  description: "Dashboard com gráficos e análises financeiras",
  framework: "react",
  mfName: "mfe_dashboard",
  mfExpose: "./DashboardModule",
  port: 3002,
};

export const TRANSACTIONS_MFE: MicrofrontendManifest = {
  name: "transactions",
  version: "1.0.0",
  route: "/transactions",
  description: "Listagem, filtros e CRUD de transações",
  framework: "react",
  mfName: "mfe_transactions",
  mfExpose: "./TransactionsModule",
  port: 3003,
};

export const INVESTMENTS_MFE: MicrofrontendManifest = {
  name: "investments",
  version: "1.0.0",
  route: "/investments",
  description: "Acompanhamento de investimentos",
  framework: "react",
  mfName: "mfe_investments",
  mfExpose: "./InvestmentsModule",
  port: 3004,
};

export const microfrontendRegistry = [AUTH_MFE, DASHBOARD_MFE, TRANSACTIONS_MFE, INVESTMENTS_MFE];

export const manifestByName = Object.fromEntries(
  microfrontendRegistry.map((manifest) => [manifest.name, manifest]),
) as Record<string, MicrofrontendManifest>;
