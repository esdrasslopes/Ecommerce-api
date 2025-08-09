import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CategoryName, Product } from "@prisma/client";

import { ProductWithoutCategoryError } from "./errors/product-without-category.error";

import { ProductAlreadyExistsError } from "./errors/product-already-exists.error";

interface ProductUseCaseRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  categoryName: CategoryName;
}

interface ProductUseCaseResponse {
  product: Product;
}

export class ProductUseCase {
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
  }: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {
    const category = await this.productsRepository.findCategoryByCategoryName(
      categoryName
    );

    if (!category) {
      throw new ProductWithoutCategoryError();
    }

    const productAlreadyExists =
      await this.productsRepository.findByNameAndCategory(name, category.id);

    if (productAlreadyExists) {
      throw new ProductAlreadyExistsError();
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
