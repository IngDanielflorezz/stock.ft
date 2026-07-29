import { User } from "./user.entity";

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: { name?: string; email: string; password: string }): Promise<User>;
}
