"use client";

import { ReactNode } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AuthUser } from "@/src/models/entities/auth-user";

type UserProfile = {
  profileImageUrl?: string;
  phone?: string;
  preferences?: {
    emailNotifications: boolean;
    theme: "light" | "dark" | "system";
  };
};

type AuthStoreState = {
  user: AuthUser | null;
  profile: UserProfile;
  hasHydrated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
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
      profile: {},
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
      updateProfile: (profile) => {
        set((state) => ({ profile: { ...state.profile, ...profile } }));
      },
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated });
      },
    }),
    {
      name: "flowtrack-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, profile: state.profile }),
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
  const profile = useAuthBaseStore((state) => state.profile);
  const hasHydrated = useAuthBaseStore((state) => state.hasHydrated);
  const login = useAuthBaseStore((state) => state.login);
  const logout = useAuthBaseStore((state) => state.logout);
  const updateProfile = useAuthBaseStore((state) => state.updateProfile);

  return {
    user,
    profile,
    hasHydrated,
    isAuthenticated: Boolean(user),
    login,
    logout,
    updateProfile,
  };
}
