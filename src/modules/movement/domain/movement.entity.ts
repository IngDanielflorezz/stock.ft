import { BaseEntity } from "@/shared/domain/base-entity";

export type MovementType = "in" | "out";

export interface MovementProps {
  id: string;
  type: MovementType;
  quantity: number;
  description?: string | null;
  reference?: string | null;
  productId: string;
  userId: string;
  createdAt?: Date;
}

export class Movement extends BaseEntity {
  public readonly type: MovementType;
  public readonly quantity: number;
  public readonly description?: string | null;
  public readonly reference?: string | null;
  public readonly productId: string;
  public readonly userId: string;

  constructor(props: MovementProps) {
    super(props.id, props.createdAt);
    this.type = props.type;
    this.quantity = props.quantity;
    this.description = props.description;
    this.reference = props.reference;
    this.productId = props.productId;
    this.userId = props.userId;
  }

  toPrimitives() {
    return {
      id: this.id,
      type: this.type,
      quantity: this.quantity,
      description: this.description,
      reference: this.reference,
      productId: this.productId,
      userId: this.userId,
      createdAt: this.createdAt,
    };
  }
}
