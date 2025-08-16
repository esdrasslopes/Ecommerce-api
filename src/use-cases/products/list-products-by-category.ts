import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CategoryName, Product } from "@prisma/client";

import { CategoryDoesNotExistError } from "../errors/category-does-not-exist";

interface ListProductsByCategoryUseCaseRequest {
  categoryName: CategoryName;
  page: number;
}

interface ListProductsByCategoryUseCaseResponse {
  productsByCategory: Product[];
}

export class ListProductsByCategoryUseCase {
  private listProductsRepository: IProductsRepository;

  constructor(listProductsRepository: IProductsRepository) {
    this.listProductsRepository = listProductsRepository;
  }

  async execute({
    categoryName,
    page,
  }: ListProductsByCategoryUseCaseRequest): Promise<ListProductsByCategoryUseCaseResponse> {
    const category =
      await this.listProductsRepository.findCategoryByCategoryName(
        categoryName
      );

    if (!category) {
      throw new CategoryDoesNotExistError();
    }

    const productsByCategory =
      await this.listProductsRepository.getProductsByCategory(
        category.id,
        page
      );

    return { productsByCategory };
  }
}
