import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";

import { GetDetailsOfASpecificOrderUseCase } from "../orders/get-details-of-a-specific-order";

export const makeGetDetailsOfASpecificOrderUseCase = () => {
  const ordersRepository = new PrismaOrdersRepository();

  const getDetailsOfASpecificOrderUseCase =
    new GetDetailsOfASpecificOrderUseCase(ordersRepository);

  return getDetailsOfASpecificOrderUseCase;
};
