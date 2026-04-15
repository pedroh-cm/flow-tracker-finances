import { AuthUser } from "@/src/models/entities/auth-user";
import { AuthRepository } from "@/src/models/repositories/auth-repository";

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(email: string, password: string): AuthUser {
    if (!email || !password) {
      throw new Error("Preencha todos os campos");
    }

    if (password.length < 4) {
      throw new Error("Senha deve ter pelo menos 4 caracteres");
    }

    return this.authRepository.login(email, password);
  }
}
