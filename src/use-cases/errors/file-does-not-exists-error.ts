export class FileDoesExistsError extends Error {
  constructor() {
    super("File Does Not Exists");
  }
}
