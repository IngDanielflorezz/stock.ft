import { Product } from "./product.entity";

export interface IProductRepository {
  findByUserId(userId: string): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  countByUserId(userId: string): Promise<number>;
  countLowStockByUserId(userId: string): Promise<number>;
}
