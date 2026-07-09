import { NextRequest, NextResponse } from "next/server";

import { loginApiSchema } from "@/src/lib/auth/login-schema";
import { verifyPassword } from "@/src/lib/auth/password";
import { setSessionCookie } from "@/src/lib/auth/session";
import { findUserByEmail } from "@/src/lib/auth/users";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginApiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Dados inválidos" },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;
    const user = findUserByEmail(email);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    const authUser = { id: user.id, name: user.name, email: user.email };
    const rememberMe = Boolean(body.rememberMe);

    await setSessionCookie(authUser, rememberMe);

    return NextResponse.json({ user: authUser });
  } catch (error) {
    console.error("[auth/login]", error);
    return NextResponse.json({ error: "Erro interno ao autenticar" }, { status: 500 });
  }
}
