export class CategoryDoesNotExistError extends Error {
  constructor() {
    super("Category Doesnt Exists");
  }
}
