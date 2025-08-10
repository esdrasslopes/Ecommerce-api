import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CategoryName, Product } from "@prisma/client";

import { ProductWithoutCategoryError } from "./errors/product-without-category.error";

import { ProductAlreadyExistError } from "./errors/product-already-exist.error";

interface CreateProductUseCaseRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  categoryName: CategoryName;
}

interface CreateProductUseCaseResponse {
  product: Product;
}

export class CreateProductUseCase {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({
    categoryName,
    name,
    description,
    price,
    stock,
    image_url,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const category = await this.productsRepository.findCategoryByCategoryName(
      categoryName
    );

    if (!category) {
      throw new ProductWithoutCategoryError();
    }

    const productAlreadyExists =
      await this.productsRepository.findByNameAndCategory(name, category.id);

    if (productAlreadyExists) {
      throw new ProductAlreadyExistError();
    }

    const product = await this.productsRepository.createProduct({
      name,
      description,
      price,
      stock,
      image_url,
      category_id: category.id,
    });

    return { product };
  }
}
