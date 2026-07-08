import { createHash, timingSafeEqual } from "crypto";

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  const inputHash = hashPassword(password);
  const inputBuffer = Buffer.from(inputHash, "hex");
  const storedBuffer = Buffer.from(hash, "hex");

  if (inputBuffer.length !== storedBuffer.length) return false;

  return timingSafeEqual(inputBuffer, storedBuffer);
}
