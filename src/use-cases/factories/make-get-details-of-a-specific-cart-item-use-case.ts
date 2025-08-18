import { PrismaCartsRepository } from "@/repositories/prisma/prisma-carts-repository";

import { GetDetailsOfASpecifCartItemUseCase } from "../carts/get-details-of-a-specific-cart-item-use-case";

export const makeGetDetailsOfASpecifCartItemUseCase = () => {
  const cartsRepository = new PrismaCartsRepository();

  const getDetailsOfASpecifCartItemUseCase =
    new GetDetailsOfASpecifCartItemUseCase(cartsRepository);

  return getDetailsOfASpecifCartItemUseCase;
};
