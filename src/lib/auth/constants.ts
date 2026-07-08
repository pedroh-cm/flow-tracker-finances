export const AUTH_COOKIE_NAME = "flowtrack-session";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET deve ser definido em produção");
  }

  return "flowtrack-dev-secret-change-in-production";
}
