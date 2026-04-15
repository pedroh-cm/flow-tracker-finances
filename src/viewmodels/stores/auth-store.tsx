"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

import { AuthUser } from "@/src/models/entities/auth-user";
import { LocalAuthRepository } from "@/src/models/services/local-auth-repository";
import { LoginUseCase } from "@/src/viewmodels/use-cases/login-use-case";
import { LogoutUseCase } from "@/src/viewmodels/use-cases/logout-use-case";

type AuthStoreContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthStoreContext = createContext<AuthStoreContextValue | null>(null);

const authRepository = new LocalAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);

type AuthStoreProviderProps = {
  children: ReactNode;
};

export function AuthStoreProvider({ children }: AuthStoreProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => authRepository.getCurrentUser());

  const login = useCallback((email: string, password: string) => {
    const loggedUser = loginUseCase.execute(email, password);
    setUser(loggedUser);
  }, []);

  const logout = useCallback(() => {
    logoutUseCase.execute();
    setUser(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [login, logout, user],
  );

  return <AuthStoreContext.Provider value={contextValue}>{children}</AuthStoreContext.Provider>;
}

export function useAuthStore() {
  const context = useContext(AuthStoreContext);
  if (!context) {
    throw new Error("useAuthStore must be used within AuthStoreProvider");
  }

  return context;
}
