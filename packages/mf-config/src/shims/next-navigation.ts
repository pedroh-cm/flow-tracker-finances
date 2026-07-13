type AppRouterInstance = {
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
  forward: () => void;
  refresh: () => void;
  prefetch: (href: string) => void;
};

/**
 * Minimal next/navigation shim for Vite remotes (no App Router context).
 */
export function useRouter(): AppRouterInstance {
  return {
    push: (href) => window.location.assign(href),
    replace: (href) => window.location.replace(href),
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => window.location.reload(),
    prefetch: () => undefined,
  };
}

export function usePathname(): string {
  return window.location.pathname;
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return {} as T;
}

export function redirect(url: string): never {
  window.location.assign(url);
  throw new Error(`Redirecting to ${url}`);
}

export function notFound(): never {
  throw new Error("NEXT_NOT_FOUND");
}
