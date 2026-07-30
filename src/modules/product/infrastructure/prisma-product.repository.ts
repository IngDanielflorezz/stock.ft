import { prisma } from "@/shared/infrastructure/prisma";
import { IProductRepository } from "../domain/product.repository.interface";
import { Product, type ProductProps } from "../domain/product.entity";

export class PrismaProductRepository implements IProductRepository {
  async findByUserId(userId: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: { userId, active: true },
      orderBy: { createdAt: "desc" },
    });
    return products.map((p) => Product.create(p as ProductProps));
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({ where: { id } });
    return product ? Product.create(product) : null;
  }

  async create(product: Product): Promise<Product> {
    const data = product.toPrimitives();
    const created = await prisma.product.create({
      data: {
        id: data.id,
        name: data.name,
        sku: data.sku,
        barcode: data.barcode,
        description: data.description,
        costPrice: data.costPrice,
        salePrice: data.salePrice,
        stock: data.stock,
        minStock: data.minStock,
        category: data.category,
        supplier: data.supplier,
        location: data.location,
        userId: data.userId,
      },
    });
    return Product.create(created);
  }

  async countByUserId(userId: string): Promise<number> {
    return prisma.product.count({ where: { userId, active: true } });
  }

  async countLowStockByUserId(userId: string): Promise<number> {
    return prisma.product.count({
      where: { userId, active: true, stock: { lte: prisma.product.fields.minStock } },
    });
  }
}
