import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, "E-mail obrigatório").email("E-mail inválido"),
  password: z
    .string()
    .min(1, "Senha obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const loginApiSchema = loginFormSchema.pick({ email: true, password: true });
