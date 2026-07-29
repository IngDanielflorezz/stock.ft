import bcrypt from "bcryptjs";
import { Result } from "@/shared/domain/result";
import { IAuthRepository } from "../domain/auth.repository.interface";

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(data: { name?: string; email: string; password: string }): Promise<Result<void>> {
    if (!data.email || !data.password) {
      return Result.fail("Email y contraseña requeridos");
    }

    const exists = await this.authRepository.findByEmail(data.email);
    if (exists) {
      return Result.fail("El email ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await this.authRepository.create({ ...data, password: hashedPassword });

    return Result.created(undefined);
  }
}
