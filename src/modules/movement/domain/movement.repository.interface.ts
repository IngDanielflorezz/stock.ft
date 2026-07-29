import { Movement } from "./movement.entity";

export interface MovementWithProduct {
  id: string;
  type: string;
  quantity: number;
  description: string | null;
  reference: string | null;
  createdAt: Date;
  product: { name: string };
}

export interface IMovementRepository {
  findByUserId(userId: string, limit?: number): Promise<MovementWithProduct[]>;
  countByUserId(userId: string): Promise<number>;
  create(data: {
    type: string;
    quantity: number;
    description?: string;
    reference?: string;
    productId: string;
    userId: string;
  }): Promise<Movement>;
}
