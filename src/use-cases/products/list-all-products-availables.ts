import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { Product } from "@prisma/client";

interface ListAllProductsAvailablesUseCaseRequest {
  page: number;
}

interface ListAllProductsAvailablesUseCaseResponse {
  products: Product[];
}

export class ListAllProductsAvailablesUseCase {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({
    page,
  }: ListAllProductsAvailablesUseCaseRequest): Promise<ListAllProductsAvailablesUseCaseResponse> {
    const productsAvailables =
      await this.productsRepository.getAvailableProducts(page);

    return { products: productsAvailables };
  }
}
