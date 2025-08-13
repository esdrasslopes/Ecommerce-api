import { Cart, CartItem } from "@prisma/client";

import { ICartsRepository } from "../repositories-types/carts-repository";

import { randomUUID } from "crypto";

export class InMemoryCartsRepository implements ICartsRepository {
  private carts: Cart[] = [];

  private cartItems: CartItem[] = [];

  async createCart(userId: string) {
    const cart: Cart = {
      id: randomUUID(),
      user_id: userId,
    };

    this.carts.push(cart);

    return cart;
  }

  async findCartById(id: string) {
    const cart = this.carts.find((cart) => cart.id === id);

    if (!cart) {
      return null;
    }

    return cart;
  }

  async addItemtoCart(cartId: string, productId: string, quantity: number) {
    const cartItem: CartItem = {
      id: randomUUID(),
      cart_id: cartId,
      product_id: productId,
      quantity,
    };

    this.cartItems.push(cartItem);

    return cartItem;
  }

  async getCartItemsFromCart(cartId: string) {
    const items = this.cartItems.filter((item) => item.cart_id === cartId);

    return items;
  }
}
