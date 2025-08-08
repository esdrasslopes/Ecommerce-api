export class ProductWithoutCategoryError extends Error {
  constructor() {
    super("Cannot create a product without a category");
  }
}
