import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";

import { GetOrderHistoryUseCase } from "../orders/get-order-history";

export const makeGetOrderHistoryUseCase = () => {
  const ordersRepository = new PrismaOrdersRepository();

  const getOrderHistoryUseCase = new GetOrderHistoryUseCase(ordersRepository);

  return getOrderHistoryUseCase;
};
