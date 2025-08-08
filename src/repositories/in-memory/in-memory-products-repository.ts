import { Prisma, Product, Category, CategoryName } from "@prisma/client";

import { IProductsRepository } from "../repositories-types/products-repository";

import { randomUUID } from "crypto";

export class InMemoryProductsRepository implements IProductsRepository {
  private productsItems: Product[] = [];

  private categories: Category[] = [];

  async createProduct(
    data: Prisma.ProductUncheckedCreateInput
  ): Promise<Product> {
    const product: Product = {
      id: randomUUID(),
      description: data.description ?? null,
      created_at: new Date(),
      name: "Air force",
      price: new Prisma.Decimal(data.price as string | number),
      stock: data.stock,
      updated_at: new Date(),
      image_url: data.image_url || null,
      category_id: data.category_id,
    };

    this.productsItems.push(product);

    return product;
  }

  async createCategory(categoryName: CategoryName): Promise<Category> {
    const category: Category = {
      id: randomUUID(),
      created_at: new Date(),
      name: categoryName,
    };

    this.categories.push(category);

    return category;
  }

  async findCategoryByCategoryName(
    categoryName: CategoryName
  ): Promise<Category | null> {
    const category = this.categories.find(
      (category) => category.name === categoryName
    );

    if (!category) {
      return null;
    }

    return category;
  }

  async findByNameAndCategory(
    name: string,
    category_id: string
  ): Promise<Product | null> {
    const product = this.productsItems.find(
      (product) => product.name === name && product.category_id === category_id
    );

    if (!product) {
      return null;
    }

    return product;
  }
}
