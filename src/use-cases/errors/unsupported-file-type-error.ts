export class UnsuportedFileTypeError extends Error {
  constructor() {
    super("Unsupported File Type. Please Upload An Image In JPG, PNG or JPEG.");
  }
}
