import { init, loadRemote } from "@module-federation/runtime";
import type { ComponentType } from "react";

import { REMOTES, getRemoteModuleId, type RemoteKey } from "@flowtrack/mf-config";

let initialized = false;

function getClientRemoteUrl(key: RemoteKey): string {
  const remote = REMOTES[key];
  const envValue = process.env[remote.envKey];
  return (envValue ?? remote.defaultUrl).replace(/\/$/, "");
}

function getClientFederationRemotes() {
  return (Object.keys(REMOTES) as RemoteKey[]).map((key) => {
    const remote = REMOTES[key];
    return {
      name: remote.mfName,
      entry: `${getClientRemoteUrl(key)}/remoteEntry.js`,
      type: "module" as const,
      entryGlobalName: remote.mfName,
      shareScope: "default",
    };
  });
}

export function initModuleFederation() {
  if (initialized || typeof window === "undefined") return;

  init({
    name: "shell",
    remotes: getClientFederationRemotes(),
  });

  initialized = true;
}

export async function loadFederatedModule(manifestKey: string): Promise<ComponentType> {
  initModuleFederation();

  const moduleId = getRemoteModuleId(manifestKey as RemoteKey);
  const remoteModule = await loadRemote<{ default: ComponentType }>(moduleId);

  if (!remoteModule) {
    throw new Error(`Módulo federado "${moduleId}" não encontrado`);
  }

  if (typeof remoteModule === "function") {
    return remoteModule as ComponentType;
  }

  return remoteModule.default ?? (remoteModule as unknown as ComponentType);
}
