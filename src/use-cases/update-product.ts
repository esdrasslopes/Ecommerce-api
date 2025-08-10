import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { Product } from "@prisma/client";

import { ProductDoesntExistError } from "./errors/product-doesnt-exists-error";

interface UpdateProductUseCaseRequest {
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  image_url?: string;
}

interface UpdateProductUseCaseResponse {
  updatedProduct: Product;
}

export class UpdateProductUseCase {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(
    { name, description, price, stock, image_url }: UpdateProductUseCaseRequest,
    productId: string
  ): Promise<UpdateProductUseCaseResponse> {
    const productToUpdate = await this.productsRepository.findProductById(
      productId
    );

    if (!productToUpdate) {
      throw new ProductDoesntExistError();
    }

    const updatedProduct = await this.productsRepository.updateProduct(
      { name, description, price, stock, image_url },
      productToUpdate
    );

    return { updatedProduct };
  }
}
