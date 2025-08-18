import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";

import { ValidateOrderUseCase } from "../orders/validate-order";

export const makeValidateOrderUseCase = () => {
  const ordersRepository = new PrismaOrdersRepository();

  const validateOrderUseCase = new ValidateOrderUseCase(ordersRepository);

  return validateOrderUseCase;
};
