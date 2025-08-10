export class ProductDoesNotExistError extends Error {
  constructor() {
    super("Product Doesnt Exists");
  }
}
