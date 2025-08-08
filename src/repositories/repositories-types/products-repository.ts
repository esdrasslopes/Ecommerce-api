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
}
