import { CancelOrderUseCase } from "../orders/cancel-order";

import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";

export const makeCancelOrderUseCase = () => {
  const ordersRepository = new PrismaOrdersRepository();

  const cancelOrderUseCase = new CancelOrderUseCase(ordersRepository);

  return cancelOrderUseCase;
};
