import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { UpdateProductUseCase } from "../products/update-product";

export const makeUpdateProductUseCaseUseCase = () => {
  const productsRepository = new PrismaProductsRepository();

  const updateProductUseCase = new UpdateProductUseCase(productsRepository);

  return updateProductUseCase;
};
