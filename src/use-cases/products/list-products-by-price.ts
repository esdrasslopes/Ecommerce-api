import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { Product } from "@prisma/client";

interface ListProductsByPriceUseCaseRequest {
  price: number;
  page: number;
}

interface ListProductsByPriceUseCaseResponse {
  productsByPrice: Product[];
}

export class ListProductsByPriceUseCase {
  private listProductsByPriceRepository: IProductsRepository;

  constructor(listProductsByPriceRepository: IProductsRepository) {
    this.listProductsByPriceRepository = listProductsByPriceRepository;
  }

  async execute({
    price,
    page,
  }: ListProductsByPriceUseCaseRequest): Promise<ListProductsByPriceUseCaseResponse> {
    const productsByPrice =
      await this.listProductsByPriceRepository.getProductsByPrice(price, page);

    return { productsByPrice };
  }
}
