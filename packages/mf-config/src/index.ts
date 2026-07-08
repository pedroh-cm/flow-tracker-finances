export const SHELL_NAME = "shell";

export type RemoteDefinition = {
  /** Module Federation remote name (underscore) */
  mfName: string;
  /** Manifest key used in registry */
  manifestKey: string;
  /** Exposed module path */
  exposePath: string;
  /** Dev / preview port */
  port: number;
  /** Environment variable for remote URL */
  envKey: string;
  /** Default local URL */
  defaultUrl: string;
};

export const REMOTES = {
  auth: {
    mfName: "mfe_auth",
    manifestKey: "auth",
    exposePath: "./AuthModule",
    port: 3001,
    envKey: "NEXT_PUBLIC_MFE_AUTH_URL",
    defaultUrl: "http://localhost:3001",
  },
  dashboard: {
    mfName: "mfe_dashboard",
    manifestKey: "dashboard",
    exposePath: "./DashboardModule",
    port: 3002,
    envKey: "NEXT_PUBLIC_MFE_DASHBOARD_URL",
    defaultUrl: "http://localhost:3002",
  },
  transactions: {
    mfName: "mfe_transactions",
    manifestKey: "transactions",
    exposePath: "./TransactionsModule",
    port: 3003,
    envKey: "NEXT_PUBLIC_MFE_TRANSACTIONS_URL",
    defaultUrl: "http://localhost:3003",
  },
  investments: {
    mfName: "mfe_investments",
    manifestKey: "investments",
    exposePath: "./InvestmentsModule",
    port: 3004,
    envKey: "NEXT_PUBLIC_MFE_INVESTMENTS_URL",
    defaultUrl: "http://localhost:3004",
  },
} as const satisfies Record<string, RemoteDefinition>;

export type RemoteKey = keyof typeof REMOTES;

export function getRemoteUrl(key: RemoteKey): string {
  const remote = REMOTES[key];
  const fromEnv = process.env[remote.envKey];
  return fromEnv?.replace(/\/$/, "") ?? remote.defaultUrl;
}

export function getRemoteEntry(key: RemoteKey): string {
  return `${getRemoteUrl(key)}/remoteEntry.js`;
}

export function getFederationRemotes() {
  return (Object.keys(REMOTES) as RemoteKey[]).map((key) => {
    const remote = REMOTES[key];
    return {
      name: remote.mfName,
      entry: getRemoteEntry(key),
      // Remotes Vite expõem remoteEntry.js como ES module
      type: "module" as const,
      entryGlobalName: remote.mfName,
      shareScope: "default",
    };
  });
}

export function getRemoteModuleId(key: RemoteKey): string {
  const remote = REMOTES[key];
  const exposeName = remote.exposePath.replace("./", "");
  return `${remote.mfName}/${exposeName}`;
}
