export class InvalidImportUrlError extends Error {
  constructor(message = "Invalid URL") {
    super(message)
  }
}
