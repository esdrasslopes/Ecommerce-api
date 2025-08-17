import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { GetDetailsOfASpecificProductsUseCase } from "../products/get-details-of-a-specif-product";

export const makeGetDetailsOfASpecificProductsUseCase = () => {
  const productsRepository = new PrismaProductsRepository();

  const getDetailsOfASpecificProductsUseCase =
    new GetDetailsOfASpecificProductsUseCase(productsRepository);

  return getDetailsOfASpecificProductsUseCase;
};
