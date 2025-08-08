export class productAlreadyExistsError extends Error {
  constructor() {
    super("Product Already Exists");
  }
}
