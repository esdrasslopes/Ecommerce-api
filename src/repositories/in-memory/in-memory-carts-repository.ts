import { Cart, CartItem } from "@prisma/client";

import { ICartsRepository } from "../repositories-types/carts-repository";

import { randomUUID } from "crypto";

import { CartItemDoesNotExistError } from "@/use-cases/errors/cart-item-does-not-exist-error";

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

  async getCartItemsFromCart(cartId: string, page: number) {
    const items = this.cartItems
      .filter((item) => item.cart_id === cartId)
      .slice((page - 1) * 20, page * 20);

    return items;
  }

  async updateCartItemQuantity(id: string, quantity: number) {
    const cartItem = this.cartItems.find((item) => item.id === id);

    if (!cartItem) {
      throw new CartItemDoesNotExistError();
    }

    cartItem.quantity = quantity;

    return cartItem;
  }

  async deleteCartItem(cartId: string, cartItemId: string) {
    const cartItem = this.cartItems.find(
      (item) => item.cart_id === cartId && item.id === cartItemId
    );

    if (!cartItem) {
      return null;
    }

    this.cartItems = this.cartItems.filter((item) => item.id !== cartItem.id);

    return cartItem;
  }

  async findCartItemById(id: string) {
    const cartItem = this.cartItems.find((item) => item.id === id);

    if (!cartItem) {
      return null;
    }

    return cartItem;
  }

  async findCartItem(cartId: string, productId: string) {
    const cartItem = this.cartItems.find(
      (item) => item.cart_id === cartId && item.product_id === productId
    );

    if (!cartItem) {
      return null;
    }

    return cartItem;
  }
}
