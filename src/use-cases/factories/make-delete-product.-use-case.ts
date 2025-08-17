import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";

import { DeleteProductUseCase } from "../products/delete-product";

export const makeDeleteProductUseCase = () => {
  const productsRepository = new PrismaProductsRepository();

  const deleteProductUseCase = new DeleteProductUseCase(productsRepository);

  return deleteProductUseCase;
};
