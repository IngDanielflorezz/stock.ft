import { PrismaAuthRepository } from "./infrastructure/prisma-auth.repository";
import { RegisterUseCase } from "./application/register.use-case";

const authRepository = new PrismaAuthRepository();

export const registerUseCase = new RegisterUseCase(authRepository);
