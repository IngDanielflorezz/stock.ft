import { PrismaMovementRepository } from "./infrastructure/prisma-movement.repository";
import { MovementService } from "./application/movement.service";

const movementRepository = new PrismaMovementRepository();

export const movementService = new MovementService(movementRepository);
