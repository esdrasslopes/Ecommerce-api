import { Cart } from "@prisma/client";

export interface ICartRepository {
  create(userId: string): Promise<Cart>;
}
