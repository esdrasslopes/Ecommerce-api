import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { CreateCategoryUseCase } from "../products/create-category";

export const makeCreateCategoryUseCase = () => {
  const productsRepository = new PrismaProductsRepository();

  const createCategoryUseCase = new CreateCategoryUseCase(productsRepository);

  return createCategoryUseCase;
};
