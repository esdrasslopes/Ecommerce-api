import { Prisma, Product, Category, CategoryName } from "@prisma/client";

import { IProductsRepository } from "../repositories-types/products-repository";

import { updateEntity } from "@/utils/uptade-entity";

import { randomUUID } from "crypto";

import { unwrapAll } from "@/utils/unwrap-value";

import { ProductDoesNotExistError } from "@/use-cases/errors/product-does-not-exist-error";

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
      is_available: data.is_available ?? true,
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
    const product = this.productsItems.find(
      (product) => product.id === productId
    );

    if (!product) {
      return null;
    }

    return product;
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

  async getProductsByCategory(categoryId: string, page: number) {
    const products = this.productsItems
      .filter((product) => product.category_id === categoryId)
      .slice((page - 1) * 20, page * 20);

    return products;
  }

  async getProductsByName(name: string, page: number) {
    const productName = name.toLowerCase();

    const products = this.productsItems
      .filter((product) => {
        return product.name.toLowerCase().includes(productName);
      })
      .slice((page - 1) * 20, page * 20);

    return products;
  }

  async getProductsByPrice(price: number, page: number) {
    const products = this.productsItems
      .filter((product) => Number(product.price) === price)
      .slice((page - 1) * 20, page * 20);

    return products;
  }

  async findManyByIds(productsIds: string[]) {
    const products = this.productsItems.filter((product) =>
      productsIds.includes(product.id)
    );

    const cartItems = products.map((item) => {
      return {
        name: item.name,
        price: Number(item.price),
        id: item.id,
      };
    });

    return cartItems;
  }

  async updateProductStock(
    id: string,
    quantity: number,
    operation: "increment" | "decrement"
  ) {
    const product = this.productsItems.find((product) => product.id === id);

    if (!product) {
      throw new ProductDoesNotExistError();
    }

    if (operation === "decrement") {
      product.stock -= quantity;

      if (product.stock === 0) {
        product.is_available = false;
      }
    } else {
      product.stock += quantity;

      if (product.stock > 0) {
        product.is_available = true;
      }
    }

    return product;
  }

  async getAvailableProducts(page: number) {
    const productsAvailables = this.productsItems
      .filter((item) => item.is_available === true)
      .slice((page - 1) * 20, page * 20);

    return productsAvailables;
  }

  async deleteProductById(id: string) {
    const deletedProduct = this.productsItems.find((item) => item.id === id);

    this.productsItems = this.productsItems.filter(
      (item) => item.id !== deletedProduct!.id
    );

    return deletedProduct!;
  }
}
