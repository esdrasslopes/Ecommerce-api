import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { Product } from "@prisma/client";

interface ListProductsByPriceUseCaseRequest {
  price: number;
}

interface ListProductsByPriceUseCaseResponse {
  productsByPrice: Product[];
}

export class ListProductsByPriceUseCase {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({
    price,
  }: ListProductsByPriceUseCaseRequest): Promise<ListProductsByPriceUseCaseResponse> {
    const productsByPrice = await this.productsRepository.getProductsByPrice(
      price
    );

    return { productsByPrice };
  }
}
