export class ProductWithInsufficientStockError extends Error {
  constructor() {
    super("Product With Insufficient Stock");
  }
}
