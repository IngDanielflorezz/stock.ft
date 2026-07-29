import { PrismaProductRepository } from "./infrastructure/prisma-product.repository";
import { ProductService } from "./application/product.service";

const productRepository = new PrismaProductRepository();

export const productService = new ProductService(productRepository);
