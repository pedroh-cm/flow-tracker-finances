"use client";

import { ReactNode, useEffect } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { MFE_EVENTS, mfeEventBus } from "@/src/microfrontends/shared/event-bus";
import { AuthUser } from "@/src/models/entities/auth-user";
import { authApiService } from "@/src/models/services/auth-api-service";

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
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

const useAuthBaseStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      profile: {},
      hasHydrated: false,
      isLoading: false,
      login: async (email, password, rememberMe = true) => {
        set({ isLoading: true });
        try {
          const user = await authApiService.login(email, password, rememberMe);
          set({ user, isLoading: false });
          mfeEventBus.emit(MFE_EVENTS.AUTH_LOGIN, user);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      logout: async () => {
        set({ isLoading: true });
        try {
          await authApiService.logout();
          set({ user: null, isLoading: false });
          mfeEventBus.emit(MFE_EVENTS.AUTH_LOGOUT);
        } catch {
          set({ user: null, isLoading: false });
        }
      },
      restoreSession: async () => {
        set({ isLoading: true });
        try {
          const user = await authApiService.getCurrentUser();
          set({ user, isLoading: false });
        } catch {
          set({ user: null, isLoading: false });
        }
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
      partialize: (state) => ({ profile: state.profile }),
    },
  ),
);

type AuthStoreProviderProps = {
  children: ReactNode;
};

export function AuthStoreProvider({ children }: AuthStoreProviderProps) {
  const restoreSession = useAuthBaseStore((state) => state.restoreSession);
  const setHasHydrated = useAuthBaseStore((state) => state.setHasHydrated);

  useEffect(() => {
    void restoreSession().finally(() => setHasHydrated(true));
  }, [restoreSession, setHasHydrated]);

  return <>{children}</>;
}

export function useAuthStore() {
  const user = useAuthBaseStore((state) => state.user);
  const profile = useAuthBaseStore((state) => state.profile);
  const hasHydrated = useAuthBaseStore((state) => state.hasHydrated);
  const isLoading = useAuthBaseStore((state) => state.isLoading);
  const login = useAuthBaseStore((state) => state.login);
  const logout = useAuthBaseStore((state) => state.logout);
  const updateProfile = useAuthBaseStore((state) => state.updateProfile);

  return {
    user,
    profile,
    hasHydrated,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    logout,
    updateProfile,
  };
}
