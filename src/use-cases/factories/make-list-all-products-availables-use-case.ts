import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { ListAllProductsAvailablesUseCase } from "../products/list-all-products-availables";

export const makeListAllProductsAvailablesUseCase = () => {
  const productsRepository = new PrismaProductsRepository();

  const listAllProductsAvailablesUseCase = new ListAllProductsAvailablesUseCase(
    productsRepository
  );

  return listAllProductsAvailablesUseCase;
};
