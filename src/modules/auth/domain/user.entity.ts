import { BaseEntity } from "@/shared/domain/base-entity";
import { ValidationError } from "@/shared/domain/errors";

export interface UserProps {
  id: string;
  name?: string | null;
  email: string;
  password?: string | null;
  businessName?: string | null;
  businessId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends BaseEntity {
  public readonly name?: string | null;
  public readonly email: string;
  public readonly password?: string | null;
  public readonly businessName?: string | null;
  public readonly businessId?: string | null;

  private constructor(props: UserProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.businessName = props.businessName;
    this.businessId = props.businessId;
  }

  static create(props: UserProps): User {
    if (!props.email) throw new ValidationError("Email es requerido");
    return new User(props);
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      businessName: this.businessName,
      businessId: this.businessId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
