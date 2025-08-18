import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";

import { CreateOrderUseCase } from "../orders/create-order";

export const makeCreateOrderUseCase = () => {
  const productsRepository = new PrismaProductsRepository();

  const ordersRepository = new PrismaOrdersRepository();

  const createOrderUseCase = new CreateOrderUseCase(
    ordersRepository,
    productsRepository
  );

  return createOrderUseCase;
};
