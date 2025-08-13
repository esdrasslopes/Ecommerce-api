export class CartItemDoesNotExistError extends Error {
  constructor() {
    super("Cart Item Does Not Exists");
  }
}
