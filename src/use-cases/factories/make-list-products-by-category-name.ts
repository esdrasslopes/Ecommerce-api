import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { ListProductsByCategoryUseCase } from "../products/list-products-by-category";

export const makeListProductsByCategoryUseCase = () => {
  const productsRepository = new PrismaProductsRepository();

  const listProductsByCategoryUseCase = new ListProductsByCategoryUseCase(
    productsRepository
  );

  return listProductsByCategoryUseCase;
};
