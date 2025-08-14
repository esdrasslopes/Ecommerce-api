export class OrderDoesNotExistError extends Error {
  constructor() {
    super("Order Does Not Exists");
  }
}
