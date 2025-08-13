import { InMemoryCartsRepository } from "@/repositories/in-memory/in-memory-carts-repository";

import { Product } from "@prisma/client";

export const createCartAndCartItems = async (
  products: Product[],
  userId: string
) => {
  const cartRepository = new InMemoryCartsRepository();

  const cart = await cartRepository.createCart(userId);

  for (const product of products) {
    const cartItem = await cartRepository.addItemtoCart(
      cart.id,
      product.id,
      10
    );
  }

  const itemsFromCart = await cartRepository.getCartItemsFromCart(cart.id);

  return itemsFromCart;
};
