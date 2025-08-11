import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { Product } from "@prisma/client";

interface ListProductsByNameUseCaseRequest {
  productName: string;
}

interface ListProductsByNameUseCaseResponse {
  productsByName: Product[];
}

export class ListProductsByNameUseCase {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({
    productName,
  }: ListProductsByNameUseCaseRequest): Promise<ListProductsByNameUseCaseResponse> {
    const productsByName = await this.productsRepository.getProductsByName(
      productName
    );

    return { productsByName };
  }
}
