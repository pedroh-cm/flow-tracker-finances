import { AuthUser } from "@/src/models/entities/auth-user";

type LoginResponse = {
  user: AuthUser;
};

type MeResponse = {
  user: AuthUser | null;
};

export class AuthApiService {
  async login(email: string, password: string, rememberMe = true): Promise<AuthUser> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Não foi possível autenticar");
    }

    return (data as LoginResponse).user;
  }

  async logout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const response = await fetch("/api/auth/me");

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as MeResponse;
    return data.user;
  }
}

export const authApiService = new AuthApiService();
