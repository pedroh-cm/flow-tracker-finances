type EventCallback<T = unknown> = (payload: T) => void;

class MicrofrontendEventBus {
  private listeners = new Map<string, Set<EventCallback>>();

  on<T>(event: string, callback: EventCallback<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback as EventCallback);

    return () => this.off(event, callback);
  }

  off<T>(event: string, callback: EventCallback<T>) {
    this.listeners.get(event)?.delete(callback as EventCallback);
  }

  emit<T>(event: string, payload?: T) {
    this.listeners.get(event)?.forEach((callback) => callback(payload));
  }
}

export const mfeEventBus = new MicrofrontendEventBus();

export const MFE_EVENTS = {
  TRANSACTION_CREATED: "transaction:created",
  TRANSACTION_UPDATED: "transaction:updated",
  TRANSACTION_DELETED: "transaction:deleted",
  THEME_CHANGED: "theme:changed",
  NAVIGATE: "shell:navigate",
  AUTH_LOGIN: "auth:login",
  AUTH_LOGOUT: "auth:logout",
} as const;
