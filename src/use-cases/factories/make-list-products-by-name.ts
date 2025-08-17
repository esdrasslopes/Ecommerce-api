import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { ListProductsByNameUseCase } from "../products/list-products-by-name";

export const makeListProductsByNameUseCase = () => {
  const productsRepository = new PrismaProductsRepository();

  const listProductsByNameUseCase = new ListProductsByNameUseCase(
    productsRepository
  );

  return listProductsByNameUseCase;
};
