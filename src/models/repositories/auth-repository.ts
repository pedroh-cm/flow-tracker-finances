import { AuthUser } from "@/src/models/entities/auth-user";

export interface AuthRepository {
  getCurrentUser(): AuthUser | null;
  login(email: string, password: string): AuthUser;
  logout(): void;
}
