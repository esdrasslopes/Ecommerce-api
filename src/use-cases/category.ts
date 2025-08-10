import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { Category, CategoryName } from "@prisma/client";

import { ExistingCategoryError } from "./errors/existing-category-error";

interface CreateCategoryUseCaseRequest {
  categoryName: CategoryName;
}

interface CreateCategoryUseCaseResponse {
  category: Category;
}

export class CreateCategoryUseCase {
  private categoryRepository: IProductsRepository;

  constructor(categoryRepository: IProductsRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute({
    categoryName,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const categoryWithSameName =
      await this.categoryRepository.findCategoryByCategoryName(categoryName);

    if (categoryWithSameName) {
      throw new ExistingCategoryError();
    }

    const category = await this.categoryRepository.createCategory(categoryName);

    return { category };
  }
}
