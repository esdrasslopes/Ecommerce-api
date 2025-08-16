import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CategoryName, Product } from "@prisma/client";

import { ProductWithoutCategoryError } from "../errors/product-without-category.error";

import { ProductAlreadyExistError } from "../errors/product-already-exist.error";

interface CreateProductUseCaseRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  author: string;
  publisher: string;
  categoryName: CategoryName;
}

interface CreateProductUseCaseResponse {
  product: Product;
}

export class CreateProductUseCase {
  private createProductRepository: IProductsRepository;

  constructor(createProductRepository: IProductsRepository) {
    this.createProductRepository = createProductRepository;
  }

  async execute({
    categoryName,
    name,
    description,
    price,
    stock,
    image_url,
    author,
    publisher,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const category =
      await this.createProductRepository.findCategoryByCategoryName(
        categoryName
      );

    if (!category) {
      throw new ProductWithoutCategoryError();
    }

    const productAlreadyExists =
      await this.createProductRepository.findByNameAndCategory(
        name,
        category.id
      );

    if (productAlreadyExists) {
      throw new ProductAlreadyExistError();
    }

    const product = await this.createProductRepository.createProduct({
      name,
      description,
      price,
      stock,
      image_url,
      category_id: category.id,
      author,
      publisher,
    });

    return { product };
  }
}
