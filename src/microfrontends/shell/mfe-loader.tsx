"use client";

import { Component, ComponentType, type ReactNode, useEffect, useState } from "react";

import { manifestByName, type MicrofrontendManifest } from "@flowtrack/shared/registry";
import { REMOTES, type RemoteKey } from "@flowtrack/mf-config";

type MfeLoaderProps = {
  manifest: MicrofrontendManifest;
  fallback?: React.ReactNode;
};

const isLocalMode = () => process.env.NEXT_PUBLIC_MFE_MODE === "local";

async function isRemoteEntryHealthy(name: string): Promise<boolean> {
  const remoteKey = name as RemoteKey;
  const remote = REMOTES[remoteKey];
  if (!remote || typeof window === "undefined") return false;

  const envValue = process.env[remote.envKey];
  const baseUrl = (envValue ?? remote.defaultUrl).replace(/\/$/, "");

  try {
    const response = await fetch(`${baseUrl}/remoteEntry.js`, { method: "GET", cache: "no-store" });
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok) return false;
    if (!contentType.includes("javascript") && !contentType.includes("ecmascript")) return false;

    const body = await response.text();
    return !body.trimStart().startsWith("<!") && body.length > 100;
  } catch {
    return false;
  }
}

const localLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  auth: () => import("@/src/microfrontends/auth").then((mod) => ({ default: mod.AuthModule })),
  dashboard: () => import("@/src/microfrontends/dashboard").then((mod) => ({ default: mod.DashboardModule })),
  transactions: () =>
    import("@/src/microfrontends/transactions").then((mod) => ({ default: mod.TransactionsModule })),
  investments: () =>
    import("@/src/microfrontends/investments").then((mod) => ({ default: mod.InvestmentsModule })),
};

function LoadingState() {
  return (
    <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
      Carregando módulo...
    </div>
  );
}

function MfeErrorState({ title, message, hint }: { title: string; message: string; hint?: ReactNode }) {
  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-xs opacity-80">{message}</p>
      {hint ? <div className="mt-2 text-xs opacity-70">{hint}</div> : null}
    </div>
  );
}

class MfeErrorBoundary extends Component<{ children: ReactNode; name: string }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <MfeErrorState
          title="Erro ao renderizar microfrontend"
          message={this.state.error.message}
        />
      );
    }

    return this.props.children;
  }
}

function LocalMfeHost({ name }: { name: string }) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loader = localLoaders[name];
    if (!loader) {
      setError(`Módulo local "${name}" não encontrado`);
      return;
    }

    loader()
      .then((mod) => setComponent(() => mod.default))
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Falha ao carregar módulo");
      });
  }, [name]);

  if (error) {
    return <MfeErrorState title="Erro ao carregar módulo local" message={error} />;
  }

  if (!Component) return <LoadingState />;

  return (
    <MfeErrorBoundary name={name}>
      <Component />
    </MfeErrorBoundary>
  );
}

function FederatedMfeHost({ name }: { name: string }) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [mode, setMode] = useState<"checking" | "federation" | "local">("checking");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const canUseFederation = await isRemoteEntryHealthy(name);
      if (cancelled) return;

      if (!canUseFederation) {
        if (localLoaders[name]) {
          setMode("local");
          setUseFallback(true);
          return;
        }

        setError(
          `Remote "${name}" indisponível. O Vite em modo dev não expõe remoteEntry.js corretamente — use yarn dev:federation ou yarn dev (modo local).`,
        );
        return;
      }

      setMode("federation");

      try {
        const { loadFederatedModule } = await import("./federation-runtime");
        const RemoteComponent = await loadFederatedModule(name);
        if (!cancelled) setComponent(() => RemoteComponent);
      } catch (loadError) {
        if (!cancelled) {
          if (localLoaders[name]) {
            setMode("local");
            setUseFallback(true);
            return;
          }

          setError(loadError instanceof Error ? loadError.message : "Falha ao carregar remote");
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [name]);

  if (useFallback) {
    return <LocalMfeHost name={name} />;
  }

  if (error) {
    return (
      <MfeErrorState
        title="Erro ao carregar microfrontend"
        message={error}
        hint={
          <>
            Para Module Federation: <code>yarn dev:federation</code>
            <br />
            Para desenvolvimento rápido: <code>yarn dev</code> (modo local)
          </>
        }
      />
    );
  }

  if (!Component) {
    return (
      <div data-mfe-load-state={mode}>
        <LoadingState />
      </div>
    );
  }

  return (
    <MfeErrorBoundary name={name}>
      <Component />
    </MfeErrorBoundary>
  );
}

export function MfeLoader({ manifest, fallback }: MfeLoaderProps) {
  const [mounted, setMounted] = useState(false);
  const registryManifest = manifestByName[manifest.name] ?? manifest;
  const useLocal = isLocalMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div data-mfe={manifest.name} data-mfe-version={manifest.version}>
        {fallback}
        <LoadingState />
      </div>
    );
  }

  return (
    <div
      data-mfe={manifest.name}
      data-mfe-version={manifest.version}
      data-mfe-mode={useLocal ? "local" : "federation"}
      data-mf-remote={registryManifest.mfName}
    >
      {fallback}
      {useLocal ? <LocalMfeHost name={manifest.name} /> : <FederatedMfeHost name={manifest.name} />}
    </div>
  );
}
