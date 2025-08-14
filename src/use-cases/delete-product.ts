import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { Product } from "@prisma/client";

import { ProductDoesNotExistError } from "./errors/product-does-not-exist-error";

interface DeleteProductUseCaseRequest {
  productId: string;
}

interface DeleteProductUseCaseResponse {
  deletedProduct: Product;
}

export class DeleteProductUseCase {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({
    productId,
  }: DeleteProductUseCaseRequest): Promise<DeleteProductUseCaseResponse> {
    const product = await this.productsRepository.findProductById(productId);

    if (!product) {
      throw new ProductDoesNotExistError();
    }

    const deletedProduct = await this.productsRepository.deleteProductById(
      productId
    );

    return { deletedProduct };
  }
}
