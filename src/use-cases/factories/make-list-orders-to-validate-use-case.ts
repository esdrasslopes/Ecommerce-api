import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";

import { ListOrdersToValidateUseCase } from "../orders/list-orders-to-validate";

export const makeListOrdersToValidateUseCase = () => {
  const ordersRepository = new PrismaOrdersRepository();

  const listOrdersToValidateUseCase = new ListOrdersToValidateUseCase(
    ordersRepository
  );

  return listOrdersToValidateUseCase;
};
