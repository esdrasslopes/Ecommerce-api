import { Prisma, Product, CategoryName } from "@prisma/client";

import { IProductsRepository } from "../repositories-types/products-repository";

import { prisma } from "@/lib/prisma";

export class PrismaProductsRepository implements IProductsRepository {
  async createProduct(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({
      data,
    });

    return product;
  }

  async createCategory(categoryName: CategoryName) {
    const category = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });

    return category;
  }

  async findCategoryByCategoryName(categoryName: CategoryName) {
    const category = await prisma.category.findFirst({
      where: {
        name: categoryName,
      },
    });

    return category;
  }

  async findByNameAndCategory(name: string, categoryId: string) {
    const product = await prisma.product.findFirst({
      where: {
        category_id: categoryId,
        name,
      },
    });

    return product;
  }

  async findProductById(productId: string) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    return product;
  }

  async findManyByIds(productsIds: string[]) {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productsIds,
        },
      },
    });

    const cartItems = products.map((item) => {
      return {
        id: item.id,
        price: Number(item.price),
        name: item.name,
        image_url: item.image_url ?? "",
      };
    });

    return cartItems;
  }

  async updateProduct(
    data: Prisma.ProductUpdateInput,
    productToUpdate: Product
  ) {
    const productUpdated = await prisma.product.update({
      where: {
        id: productToUpdate.id,
      },
      data,
    });

    return productUpdated;
  }

  async getProductsByCategory(categoryId: string, page: number) {
    const productsByCategory = await prisma.product.findMany({
      where: {
        category_id: categoryId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return productsByCategory;
  }

  async getProductsByName(name: string, page: number) {
    const productsByName = await prisma.product.findMany({
      where: {
        name,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return productsByName;
  }

  async getProductsByPrice(price: number, page: number) {
    const productsByPrice = await prisma.product.findMany({
      where: {
        price,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return productsByPrice;
  }

  async getAvailableProducts(page: number) {
    const availableProducts = await prisma.product.findMany({
      where: {
        is_available: true,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return availableProducts;
  }

  async updateProductStock(
    id: string,
    newQuantity: number,
    oldQuantity: number
  ) {
    const difference = newQuantity - oldQuantity;

    const productWithUpdatedStock = await prisma.product.update({
      where: { id },
      data: {
        stock:
          difference > 0
            ? { decrement: difference }
            : difference < 0
            ? { increment: Math.abs(difference) }
            : undefined,
      },
    });

    if (productWithUpdatedStock.stock <= 0) {
      await prisma.product.update({
        where: { id },
        data: { is_available: false },
      });
    }

    return productWithUpdatedStock;
  }

  async deleteProductById(id: string) {
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });

    return deletedProduct;
  }
}
