import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CategoryName, Product } from "@prisma/client";

import { ProductDoesNotExistError } from "../errors/product-does-not-exist-error";

import { CategoryDoesNotExistError } from "../errors/category-does-not-exist";

import { deleteImage } from "@/utils/files/delete-image";

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
  private updateProductRepository: IProductsRepository;

  constructor(updateProductRepository: IProductsRepository) {
    this.updateProductRepository = updateProductRepository;
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
    const productToUpdate = await this.updateProductRepository.findProductById(
      productId
    );

    if (!productToUpdate) {
      throw new ProductDoesNotExistError();
    }

    if (
      image_url !== undefined &&
      image_url !== productToUpdate.image_url &&
      productToUpdate.image_url !== null
    ) {
      await deleteImage(productToUpdate.image_url);
    }

    let categoryId: string | null = null;

    if (categoryName) {
      const category =
        await this.updateProductRepository.findCategoryByCategoryName(
          categoryName
        );

      if (!category) {
        throw new CategoryDoesNotExistError();
      }

      categoryId = category.id;
    }

    const updatedProduct = await this.updateProductRepository.updateProduct(
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
