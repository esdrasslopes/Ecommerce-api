import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CategoryName, Product } from "@prisma/client";

import { CategoryDoesNotExistError } from "./errors/category-does-not-exist";

import { ProductDoesNotExistError } from "./errors/product-does-not-exist-error";

interface ListProductsByCategoryRequest {
  categoryName: CategoryName;
}

interface ListProductsByCategoryResponse {
  productsByRepository: Product[];
}

export class ListProductsByCategory {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({
    categoryName,
  }: ListProductsByCategoryRequest): Promise<ListProductsByCategoryResponse> {
    const category = await this.productsRepository.findCategoryByCategoryName(
      categoryName
    );

    if (!category) {
      throw new CategoryDoesNotExistError();
    }

    const productsByCategory =
      await this.productsRepository.getProductsByCategory(category.id);

    if (!productsByCategory) {
      throw new ProductDoesNotExistError();
    }

    return { productsByRepository: productsByCategory };
  }
}
