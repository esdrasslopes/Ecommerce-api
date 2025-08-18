import { PrismaCartsRepository } from "@/repositories/prisma/prisma-carts-repository";

import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { AddItemToCartUseCase } from "../carts/add-item-to-cart";

export const makeAddItemToCartUseCase = () => {
  const cartsRepository = new PrismaCartsRepository();

  const productsRepository = new PrismaProductsRepository();

  const addItemToCartUseCase = new AddItemToCartUseCase(
    cartsRepository,
    productsRepository
  );

  return addItemToCartUseCase;
};
