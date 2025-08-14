import { CartItems } from "@/types";

import { Prisma, Product, Category, CategoryName } from "@prisma/client";

export interface IProductsRepository {
  createProduct(data: Prisma.ProductUncheckedCreateInput): Promise<Product>;
  createCategory(categoryName: CategoryName): Promise<Category>;
  findCategoryByCategoryName(
    categoryName: CategoryName
  ): Promise<Category | null>;
  findByNameAndCategory(
    name: string,
    categoryId: string
  ): Promise<Product | null>;
  findProductById(productId: string): Promise<Product | null>;
  findManyByIds(productsIds: string[]): Promise<CartItems[]>;
  updateProduct(
    data: Prisma.ProductUncheckedUpdateInput,
    productToUpdate: Product
  ): Promise<Product>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getProductsByName(name: string): Promise<Product[]>;
  getProductsByPrice(price: number): Promise<Product[]>;
  getAvailableProducts(): Promise<Product[]>;
  updateProductStock(id: string, quantity: number): Promise<Product>;
  deleteProductById(id: string): Promise<Product>;
}
