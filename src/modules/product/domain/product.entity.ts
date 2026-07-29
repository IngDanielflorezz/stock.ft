import { BaseEntity } from "@/shared/domain/base-entity";
import { ValidationError } from "@/shared/domain/errors";

function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export interface ProductProps {
  id?: string;
  name: string;
  sku?: string | null;
  barcode?: string | null;
  description?: string | null;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  category?: string | null;
  supplier?: string | null;
  location?: string | null;
  active?: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends BaseEntity {
  public readonly name: string;
  public readonly sku?: string | null;
  public readonly barcode?: string | null;
  public readonly description?: string | null;
  public readonly costPrice: number;
  public readonly salePrice: number;
  public readonly stock: number;
  public readonly minStock: number;
  public readonly category?: string | null;
  public readonly supplier?: string | null;
  public readonly location?: string | null;
  public readonly active: boolean;
  public readonly userId: string;

  private constructor(props: ProductProps) {
    super(props.id ?? generateId(), props.createdAt, props.updatedAt);
    this.name = props.name;
    this.sku = props.sku;
    this.barcode = props.barcode;
    this.description = props.description;
    this.costPrice = props.costPrice;
    this.salePrice = props.salePrice;
    this.stock = props.stock;
    this.minStock = props.minStock;
    this.category = props.category;
    this.supplier = props.supplier;
    this.location = props.location;
    this.active = props.active ?? true;
    this.userId = props.userId;
  }

  static create(props: ProductProps): Product {
    if (!props.name) throw new ValidationError("Nombre es requerido");
    if (props.salePrice < 0) throw new ValidationError("Precio de venta inválido");
    if (props.stock < 0) throw new ValidationError("Stock inválido");
    return new Product({
      ...props,
      id: props.id ?? generateId(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    });
  }

  isLowStock(): boolean {
    return this.stock <= this.minStock;
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      sku: this.sku,
      barcode: this.barcode,
      description: this.description,
      costPrice: this.costPrice,
      salePrice: this.salePrice,
      stock: this.stock,
      minStock: this.minStock,
      category: this.category,
      supplier: this.supplier,
      location: this.location,
      active: this.active,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
