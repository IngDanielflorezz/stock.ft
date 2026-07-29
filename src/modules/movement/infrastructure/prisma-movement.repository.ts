import { prisma } from "@/shared/infrastructure/prisma";
import { IMovementRepository, MovementWithProduct } from "../domain/movement.repository.interface";
import { Movement, MovementProps } from "../domain/movement.entity";

export class PrismaMovementRepository implements IMovementRepository {
  async findByUserId(userId: string, limit = 100): Promise<MovementWithProduct[]> {
    return prisma.movement.findMany({
      where: { userId },
      include: { product: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async countByUserId(userId: string): Promise<number> {
    return prisma.movement.count({ where: { userId } });
  }

  async create(data: {
    type: string;
    quantity: number;
    description?: string;
    reference?: string;
    productId: string;
    userId: string;
  }): Promise<Movement> {
    const movement = await prisma.movement.create({ data });
    return new Movement(movement as MovementProps);
  }
}
