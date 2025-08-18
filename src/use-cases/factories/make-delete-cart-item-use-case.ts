import { PrismaCartsRepository } from "@/repositories/prisma/prisma-carts-repository";

import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { DeleteCartItemUseCase } from "../carts/delete-cart-item";

export const makeDeleteCartItemUseCase = () => {
  const cartsRepository = new PrismaCartsRepository();

  const productsRepository = new PrismaProductsRepository();

  const deleteCartItemUseCase = new DeleteCartItemUseCase(
    cartsRepository,
    productsRepository
  );

  return deleteCartItemUseCase;
};
