import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { ListProductsByPriceUseCase } from "../products/list-products-by-price";

export const makeListProductsByPriceUseCase = () => {
  const productsRepository = new PrismaProductsRepository();

  const listProductsByPriceUseCase = new ListProductsByPriceUseCase(
    productsRepository
  );

  return listProductsByPriceUseCase;
};
