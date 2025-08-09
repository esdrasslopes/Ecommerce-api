export class ProductAlreadyExistsError extends Error {
  constructor() {
    super("Product Already Exists");
  }
}
