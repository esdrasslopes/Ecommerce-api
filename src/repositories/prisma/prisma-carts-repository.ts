import { ICartsRepository } from "../repositories-types/carts-repository";

import { prisma } from "@/lib/prisma";

export class PrismaCartsRepository implements ICartsRepository {
  async createCart(userId: string) {
    const cart = await prisma.cart.create({
      data: {
        user_id: userId,
      },
    });

    return cart;
  }

  async findCartById(id: string) {
    const cart = await prisma.cart.findUnique({
      where: {
        id,
      },
    });

    return cart;
  }

  async addItemtoCart(cartId: string, productId: string, quantity: number) {
    const cartItem = await prisma.cartItem.create({
      data: {
        quantity,
        cart_id: cartId,
        product_id: productId,
      },
    });

    return cartItem;
  }

  async getCartItemsFromCart(cartId: string, page: number) {
    const cart = await prisma.cart.findFirst({
      where: {
        id: cartId,
      },
      include: {
        CartItem: {
          take: 20,
          skip: (page - 1) * 20,
        },
      },
    });

    return cart?.CartItem!;
  }

  async updateCartItemQuantity(id: string, quantity: number) {
    const cartItem = await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: quantity,
      },
    });

    return cartItem;
  }

  async deleteCartItem(cartId: string, cartItemId: string) {
    const deletedCartItem = await prisma.cartItem.delete({
      where: {
        id: cartItemId,
        cart_id: cartId,
      },
    });

    return deletedCartItem;
  }

  async findCartItemById(id: string) {
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id,
      },
    });

    return cartItem;
  }

  async findCartItem(cartId: string, productId: string) {
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cart_id: cartId,
        product_id: productId,
      },
    });

    return cartItem;
  }
}
