import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { Product } from "@prisma/client";

interface ListProductsByNameUseCaseRequest {
  productName: string;
}

interface ListProductsByNameUseCaseResponse {
  productsByName: Product[];
}

export class ListProductsByNameUseCase {
  private listProductsByNameRepository: IProductsRepository;

  constructor(listProductsByNameRepository: IProductsRepository) {
    this.listProductsByNameRepository = listProductsByNameRepository;
  }

  async execute({
    productName,
  }: ListProductsByNameUseCaseRequest): Promise<ListProductsByNameUseCaseResponse> {
    const productsByName =
      await this.listProductsByNameRepository.getProductsByName(productName);

    return { productsByName };
  }
}
