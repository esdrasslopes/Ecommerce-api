export class ProductAlreadyExistError extends Error {
  constructor() {
    super("Product Already Exists");
  }
}
