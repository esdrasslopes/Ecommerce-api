import { Cart } from "@prisma/client";

import { ICartRepository } from "../repositories-types/carts-repository";

import { randomUUID } from "crypto";

export class InMemoryCartsRepository implements ICartRepository {
  private carts: Cart[] = [];

  async create(userId: string) {
    const cart: Cart = {
      id: randomUUID(),
      user_id: userId,
    };

    this.carts.push(cart);

    return cart;
  }
}
