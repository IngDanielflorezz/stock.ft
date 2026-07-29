import { prisma } from "@/shared/infrastructure/prisma";
import { IAuthRepository } from "../domain/auth.repository.interface";
import { User } from "../domain/user.entity";

export class PrismaAuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? User.create(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? User.create(user) : null;
  }

  async create(data: { name?: string; email: string; password: string }): Promise<User> {
    const user = await prisma.user.create({ data });
    return User.create(user);
  }
}
