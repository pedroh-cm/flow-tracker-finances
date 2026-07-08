import { SignJWT, jwtVerify } from "jose";

import { AUTH_COOKIE_MAX_AGE, getAuthSecret } from "@/src/lib/auth/constants";
import { AuthUser } from "@/src/models/entities/auth-user";

type SessionPayload = {
  sub: string;
  name: string;
  email: string;
};

function getSecretKey() {
  return new TextEncoder().encode(getAuthSecret());
}

export async function createSessionToken(user: AuthUser): Promise<string> {
  return new SignJWT({
    name: user.name,
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${AUTH_COOKIE_MAX_AGE}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const sub = payload.sub;
    const name = payload.name;
    const email = payload.email;

    if (typeof sub !== "string" || typeof name !== "string" || typeof email !== "string") {
      return null;
    }

    return { id: sub, name, email };
  } catch {
    return null;
  }
}
