import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { CreateProductUseCase } from "../products/create-product";

export const makeCreateProductUseCase = () => {
  const productsRepository = new PrismaProductsRepository();

  const createProductsUseCase = new CreateProductUseCase(productsRepository);

  return createProductsUseCase;
};
