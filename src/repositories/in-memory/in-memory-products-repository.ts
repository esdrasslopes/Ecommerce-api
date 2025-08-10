import { Prisma, Product, Category, CategoryName } from "@prisma/client";

import { IProductsRepository } from "../repositories-types/products-repository";

import { updateEntity } from "@/utils/uptade-entity";

import { randomUUID } from "crypto";

import { unwrapAll } from "@/utils/unwrap-value";

export class InMemoryProductsRepository implements IProductsRepository {
  private productsItems: Product[] = [];

  private categories: Category[] = [];

  async createProduct(data: Prisma.ProductUncheckedCreateInput) {
    const product: Product = {
      id: randomUUID(),
      description: data.description ?? null,
      created_at: new Date(),
      name: data.name,
      price: new Prisma.Decimal(data.price as string | number),
      stock: data.stock,
      updated_at: new Date(),
      image_url: data.image_url || null,
      category_id: data.category_id,
    };

    this.productsItems.push(product);

    return product;
  }

  async createCategory(categoryName: CategoryName) {
    const category: Category = {
      id: randomUUID(),
      created_at: new Date(),
      name: categoryName,
    };

    this.categories.push(category);

    return category;
  }

  async findCategoryByCategoryName(categoryName: CategoryName) {
    const category = this.categories.find(
      (category) => category.name === categoryName
    );

    if (!category) {
      return null;
    }

    return category;
  }

  async findByNameAndCategory(name: string, category_id: string) {
    const product = this.productsItems.find(
      (product) => product.name === name && product.category_id === category_id
    );

    if (!product) {
      return null;
    }

    return product;
  }

  async findProductById(productId: String) {
    const productToUpdate = await this.productsItems.find(
      (product) => product.id === productId
    );

    if (!productToUpdate) {
      return null;
    }

    return productToUpdate;
  }

  async updateProduct(
    data: Prisma.ProductUpdateInput,
    productToUpdate: Product
  ) {
    productToUpdate = updateEntity(productToUpdate, unwrapAll(data));

    this.productsItems = this.productsItems.map((product) => {
      return product.id === productToUpdate.id ? productToUpdate : product;
    });

    return productToUpdate;
  }
}
