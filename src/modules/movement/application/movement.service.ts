import { Result } from "@/shared/domain/result";
import { IMovementRepository, MovementWithProduct } from "../domain/movement.repository.interface";

export class MovementService {
  constructor(private readonly movementRepository: IMovementRepository) {}

  async getAll(userId: string, limit = 100): Promise<Result<MovementWithProduct[]>> {
    const movements = await this.movementRepository.findByUserId(userId, limit);
    return Result.ok(movements);
  }

  async getCount(userId: string): Promise<number> {
    return this.movementRepository.countByUserId(userId);
  }
}
