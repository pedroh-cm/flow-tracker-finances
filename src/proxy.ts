import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/src/lib/auth/constants";
import { verifySessionToken } from "@/src/lib/auth/jwt";

const PROTECTED_PREFIXES = ["/dashboard", "/transactions", "/investments", "/settings"];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const user = token ? await verifySessionToken(token) : null;
  const isAuthenticated = Boolean(user);
  const isProtected = isProtectedPath(pathname);
  const isLoginPage = pathname === "/login";

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/transactions/:path*", "/investments/:path*", "/settings/:path*", "/login"],
};
