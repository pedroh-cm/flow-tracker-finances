"use client";

import { ReactNode } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AuthUser } from "@/src/models/entities/auth-user";

type AuthStoreState = {
  user: AuthUser | null;
  hasHydrated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

const createUserFromEmail = (email: string): AuthUser => ({
  name: email.split("@")[0],
  email,
});

const useAuthBaseStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      login: (email, password) => {
        if (!email || !password) {
          throw new Error("Preencha todos os campos");
        }

        if (password.length < 4) {
          throw new Error("Senha deve ter pelo menos 4 caracteres");
        }

        set({ user: createUserFromEmail(email) });
      },
      logout: () => {
        set({ user: null });
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated });
      },
    }),
    {
      name: "flowtrack-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

type AuthStoreProviderProps = {
  children: ReactNode;
};

export function AuthStoreProvider({ children }: AuthStoreProviderProps) {
  return <>{children}</>;
}

export function useAuthStore() {
  const user = useAuthBaseStore((state) => state.user);
  const hasHydrated = useAuthBaseStore((state) => state.hasHydrated);
  const login = useAuthBaseStore((state) => state.login);
  const logout = useAuthBaseStore((state) => state.logout);

  return {
    user,
    hasHydrated,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };
}
