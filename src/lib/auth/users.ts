import { hashPassword } from "@/src/lib/auth/password";

export type AuthCredentials = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

export const DEMO_USERS: AuthCredentials[] = [
  {
    id: "user-demo",
    name: "Usuário Demo",
    email: "demo@flowtrack.com",
    passwordHash: hashPassword("demo123456"),
  },
  {
    id: "user-admin",
    name: "Administrador",
    email: "admin@flowtrack.com",
    passwordHash: hashPassword("admin123456"),
  },
];

export function findUserByEmail(email: string): AuthCredentials | undefined {
  const normalized = email.trim().toLowerCase();
  return DEMO_USERS.find((user) => user.email === normalized);
}
