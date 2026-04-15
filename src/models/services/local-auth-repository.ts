import { AuthUser } from "@/src/models/entities/auth-user";
import { AuthRepository } from "@/src/models/repositories/auth-repository";

const AUTH_STORAGE_KEY = "flowtrack-user";

export class LocalAuthRepository implements AuthRepository {
  getCurrentUser(): AuthUser | null {
    if (typeof window === "undefined") return null;

    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;

    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      return null;
    }
  }

  login(email: string, password: string): AuthUser {
    void password;

    const user: AuthUser = {
      name: email.split("@")[0],
      email,
    };

    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }

    return user;
  }

  logout(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
