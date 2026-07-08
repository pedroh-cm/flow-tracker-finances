import '@testing-library/jest-dom';

process.env.NEXT_PUBLIC_MFE_MODE = 'local';

const mockFetch = jest.fn((input: RequestInfo | URL) => {
  const url = typeof input === "string" ? input : input.toString();

  if (url.includes("/api/auth/me")) {
    return Promise.resolve({
      ok: false,
      json: async () => ({ user: null }),
    } as Response);
  }

  if (url.includes("/api/auth/login")) {
    return Promise.resolve({
      ok: true,
      json: async () => ({ user: { id: "user-demo", name: "Demo", email: "demo@flowtrack.com" } }),
    } as Response);
  }

  if (url.includes("/api/auth/logout")) {
    return Promise.resolve({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);
  }

  return Promise.reject(new Error(`Unhandled fetch: ${url}`));
});

global.fetch = mockFetch as typeof fetch;

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	}),
});

class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;
