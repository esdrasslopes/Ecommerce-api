import { Cart, CartItem } from "@prisma/client";

export interface ICartsRepository {
  createCart(userId: string): Promise<Cart>;
  findCartById(id: string): Promise<Cart | null>;
  addItemtoCart(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<CartItem>;
  getCartItemsFromCart(cartId: string, page: number): Promise<CartItem[]>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem>;
  deleteCartItem(cartId: string, cartItemId: string): Promise<CartItem | null>;
  findCartItemById(id: string): Promise<CartItem | null>;
}
