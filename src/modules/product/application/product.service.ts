import { Result } from "@/shared/domain/result";
import { IProductRepository } from "../domain/product.repository.interface";
import { Product } from "../domain/product.entity";

export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async getAll(userId: string): Promise<Result<Product[]>> {
    const products = await this.productRepository.findByUserId(userId);
    return Result.ok(products);
  }

  async create(data: {
    name: string;
    sku?: string;
    barcode?: string;
    costPrice: number;
    salePrice: number;
    stock: number;
    minStock: number;
    category?: string;
    supplier?: string;
    userId: string;
  }): Promise<Result<Product>> {
    try {
      const product = Product.create(data);
      await this.productRepository.create(product);
      return Result.created(product);
    } catch (error) {
      return Result.fail((error as Error).message);
    }
  }

  async getCount(userId: string): Promise<number> {
    return this.productRepository.countByUserId(userId);
  }

  async getLowStockCount(userId: string): Promise<number> {
    const products = await this.productRepository.findByUserId(userId);
    return products.filter((p) => p.isLowStock()).length;
  }
}
