import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { Product } from "@prisma/client";

import { ProductDoesNotExistError } from "../errors/product-does-not-exist-error";

interface GetDetailsOfASpecificProductsUseCaseRequest {
  productId: string;
}

interface GetDetailsOfASpecificProductsUseCaseResponse {
  product: Product;
}

export class GetDetailsOfASpecificProductsUseCase {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({
    productId,
  }: GetDetailsOfASpecificProductsUseCaseRequest): Promise<GetDetailsOfASpecificProductsUseCaseResponse> {
    const product = await this.productsRepository.findProductById(productId);

    if (!product) {
      throw new ProductDoesNotExistError();
    }

    return { product };
  }
}
