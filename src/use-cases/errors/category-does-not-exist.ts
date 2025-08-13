export class CategoryDoesNotExistError extends Error {
  constructor() {
    super("Category Does Not Exists");
  }
}
