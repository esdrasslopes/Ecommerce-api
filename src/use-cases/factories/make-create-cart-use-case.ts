import { PrismaCartsRepository } from "@/repositories/prisma/prisma-carts-repository";

import { CreateCartUseCase } from "../carts/create-cart";

export const makeCreateCartUseCase = () => {
  const cartsRepository = new PrismaCartsRepository();

  const createCartUseCase = new CreateCartUseCase(cartsRepository);

  return createCartUseCase;
};
