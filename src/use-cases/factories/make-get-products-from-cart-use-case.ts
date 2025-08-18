import { PrismaCartsRepository } from "@/repositories/prisma/prisma-carts-repository";

import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { GetItemsFromCartUseCase } from "../carts/get-items-from-cart-use-case";

export const makeGetItemsFromCartUseCase = () => {
  const cartsRepository = new PrismaCartsRepository();

  const productsRepository = new PrismaProductsRepository();

  const getItemsFromCartUseCase = new GetItemsFromCartUseCase(
    cartsRepository,
    productsRepository
  );

  return getItemsFromCartUseCase;
};
