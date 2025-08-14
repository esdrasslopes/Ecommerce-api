import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { Product } from "@prisma/client";

interface ListAllProductsAvailablesUseCaseResponse {
  products: Product[];
}

export class ListAllProductsAvailablesUseCase {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(): Promise<ListAllProductsAvailablesUseCaseResponse> {
    const productsAvailables =
      await this.productsRepository.getAvailableProducts();

    return { products: productsAvailables };
  }
}
