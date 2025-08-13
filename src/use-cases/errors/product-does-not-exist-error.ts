export class ProductDoesNotExistError extends Error {
  constructor() {
    super("Product Does Not Exists");
  }
}
