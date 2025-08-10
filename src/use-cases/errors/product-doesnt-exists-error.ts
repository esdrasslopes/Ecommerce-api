export class ProductDoesntExistError extends Error {
  constructor() {
    super("Product Doesnt Exists");
  }
}
