import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CategoryName, Product } from "@prisma/client";

import { ProductDoesNotExistError } from "./errors/product-does-not-exist-error";

import { CategoryDoesNotExistError } from "./errors/category-does-not-exist";

interface UpdateProductUseCaseRequest {
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  image_url?: string;
  categoryName?: CategoryName;
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
    {
      name,
      description,
      price,
      stock,
      image_url,
      categoryName,
    }: UpdateProductUseCaseRequest,
    productId: string
  ): Promise<UpdateProductUseCaseResponse> {
    const productToUpdate = await this.productsRepository.findProductById(
      productId
    );

    if (!productToUpdate) {
      throw new ProductDoesNotExistError();
    }

    let categoryId: string | null = null;

    if (categoryName) {
      const category = await this.productsRepository.findCategoryByCategoryName(
        categoryName
      );

      if (!category) {
        throw new CategoryDoesNotExistError();
      }

      categoryId = category.id;
    }

    const updatedProduct = await this.productsRepository.updateProduct(
      {
        name,
        description,
        price: price,
        stock: stock,
        image_url,
        ...(categoryId ? { category_id: categoryId } : {}),
      },
      productToUpdate
    );

    return { updatedProduct };
  }
}
