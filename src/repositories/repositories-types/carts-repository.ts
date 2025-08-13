import { Cart, CartItem } from "@prisma/client";

export interface ICartsRepository {
  createCart(userId: string): Promise<Cart>;
  findCartById(id: string): Promise<Cart | null>;
  addItemtoCart(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<CartItem>;
  getCartItemsFromCart(cartId: string): Promise<CartItem[]>;
}
