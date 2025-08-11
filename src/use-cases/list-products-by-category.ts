import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CategoryName, Product } from "@prisma/client";

import { CategoryDoesNotExistError } from "./errors/category-does-not-exist";

interface ListProductsByCategoryUseCaseRequest {
  categoryName: CategoryName;
}

interface ListProductsByCategoryUseCaseResponse {
  productsByCategory: Product[];
}

export class ListProductsByCategoryUseCase {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({
    categoryName,
  }: ListProductsByCategoryUseCaseRequest): Promise<ListProductsByCategoryUseCaseResponse> {
    const category = await this.productsRepository.findCategoryByCategoryName(
      categoryName
    );

    if (!category) {
      throw new CategoryDoesNotExistError();
    }

    const productsByCategory =
      await this.productsRepository.getProductsByCategory(category.id);

    return { productsByCategory };
  }
}
