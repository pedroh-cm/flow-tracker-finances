import { cookies } from "next/headers";

import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "@/src/lib/auth/constants";
import { createSessionToken, verifySessionToken } from "@/src/lib/auth/jwt";
import { AuthUser } from "@/src/models/entities/auth-user";

export async function setSessionCookie(user: AuthUser, rememberMe = true): Promise<void> {
  const token = await createSessionToken(user);
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: rememberMe ? AUTH_COOKIE_MAX_AGE : undefined,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function getSessionUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  return verifySessionToken(token);
}

export async function getSessionUserFromToken(token: string): Promise<AuthUser | null> {
  return verifySessionToken(token);
}
