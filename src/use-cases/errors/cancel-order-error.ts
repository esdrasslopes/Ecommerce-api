export class CancelOrderError extends Error {
  constructor() {
    super("Order Does Not Exist Or Is Completed Or Has Already Been Canceled");
  }
}
