import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { CreateOrderUseCase } from "../orders/create-order";

import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";

export const makeCreateOrderUseCase = () => {
  const productsRepository = new PrismaProductsRepository();

  const ordersRepository = new PrismaOrdersRepository();

  const createOrderUseCase = new CreateOrderUseCase(
    ordersRepository,
    productsRepository
  );

  return createOrderUseCase;
};
