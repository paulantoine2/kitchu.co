export class InvalidImportUrlError extends Error {
  constructor(message = "Invalid URL") {
    super(message)
  }
}

export class InvalidRecipeError extends Error {
  constructor(message = "Recipe is invalid or incomplete") {
    super(message)
  }
}
