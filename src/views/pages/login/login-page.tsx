"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Moon, ShieldCheck, Sun, TrendingUp, Wallet } from "lucide-react";
import { useForm } from "react-hook-form";

import { LoginFormValues, loginFormSchema } from "@/src/lib/auth/login-schema";
import { useAuthStore } from "@/src/viewmodels/stores/auth-store";
import { useThemeStore } from "@/src/viewmodels/stores/theme-store";
import { PasswordInput } from "@/src/views/components/auth/password-input";
import { Button } from "@/src/views/components/ui/button";
import { Input, Label } from "@/src/views/components/ui/form";

const features = [
  { icon: Wallet, text: "Controle total do seu saldo e fluxo de caixa" },
  { icon: TrendingUp, text: "Gráficos e análises para decisões inteligentes" },
  { icon: ShieldCheck, text: "Autenticação segura com sessão JWT" },
];

export function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading } = useAuthStore();
  const { theme, hasHydrated, toggleTheme } = useThemeStore();

  const nextPath = searchParams.get("next") ?? "/dashboard";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password, values.rememberMe);
      router.push(nextPath);
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível autenticar";
      setError("root", { message });
    }
  };

  const fillDemo = () => {
    setValue("email", "demo@flowtrack.com");
    setValue("password", "demo123456");
  };

  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-gradient-primary opacity-[0.07] blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary opacity-[0.05] blur-[80px]" />
      </div>

      <div className="relative hidden w-1/2 flex-col justify-between border-r border-border bg-card/30 p-10 lg:flex">
        <div>
          <span className="font-display text-3xl font-bold tracking-tight text-foreground">
            Flow<span className="text-gradient">Track</span>
          </span>
          <p className="mt-3 max-w-sm text-muted-foreground">
            Sua plataforma de gestão financeira pessoal. Simples, segura e inteligente.
          </p>
        </div>

        <ul className="space-y-5">
          {features.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm text-foreground">
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon size={18} className="text-primary" />
              </div>
              {text}
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted-foreground">
          Protegido com JWT em cookie httpOnly · Tech Challenge FIAP Fase 02
        </p>
      </div>

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} /> Voltar
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Alternar tema"
          >
            {hasHydrated && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden text-center">
              <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                Flow<span className="text-gradient">Track</span>
              </span>
            </div>

            <div className="mb-6">
              <h1 className="font-display text-2xl font-bold text-foreground">Bem-vindo de volta</h1>
              <p className="mt-1 text-sm text-muted-foreground">Entre com suas credenciais para acessar sua conta</p>
            </div>

            <div className="glass rounded-2xl border border-border p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="seu@email.com"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className="text-xs text-destructive" role="alert">
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Senha</Label>
                  <PasswordInput
                    id="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    aria-invalid={Boolean(errors.password)}
                    {...register("password")}
                  />
                  {errors.password ? (
                    <p className="text-xs text-destructive" role="alert">
                      {errors.password.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setValue("rememberMe", event.target.checked)}
                      className="h-4 w-4 accent-primary"
                    />
                    Lembrar de mim
                  </label>
                </div>

                {errors.root ? (
                  <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive" role="alert">
                    {errors.root.message}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full gap-2 bg-gradient-primary text-primary-foreground hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Autenticando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>

              <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/30 p-4">
                <p className="text-xs font-medium text-foreground">Acesso demonstração</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <strong>demo@flowtrack.com</strong> · senha: <strong>demo123456</strong>
                </p>
                <Button type="button" variant="outline" size="sm" className="mt-3 w-full" onClick={fillDemo}>
                  Preencher credenciais demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
