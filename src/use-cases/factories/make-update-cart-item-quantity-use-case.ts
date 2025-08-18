import { PrismaCartsRepository } from "@/repositories/prisma/prisma-carts-repository";

import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { UpdateCartItemQuantityUseCase } from "../carts/update-cart-item-quantity";

export const makeUpdateCartItemQuantityUseCase = () => {
  const cartsRepository = new PrismaCartsRepository();

  const productsRepository = new PrismaProductsRepository();

  const updateCartItemQuantityUseCase = new UpdateCartItemQuantityUseCase(
    cartsRepository,
    productsRepository
  );

  return updateCartItemQuantityUseCase;
};
