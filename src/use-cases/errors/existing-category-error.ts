export class ExistingCategoryError extends Error {
  constructor() {
    super("Category Already Exists");
  }
}
