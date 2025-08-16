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
    data: Prisma.ProductUpdateInput,
    productToUpdate: Product
  ): Promise<Product>;
  getProductsByCategory(categoryId: string, page: number): Promise<Product[]>;
  getProductsByName(name: string, page: number): Promise<Product[]>;
  getProductsByPrice(price: number, page: number): Promise<Product[]>;
  getAvailableProducts(page: number): Promise<Product[]>;
  updateProductStock(
    id: string,
    newQuantity: number,
    oldQuantity: number
  ): Promise<Product>;
  deleteProductById(id: string): Promise<Product>;
}
