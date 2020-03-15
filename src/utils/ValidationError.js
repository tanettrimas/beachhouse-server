class ValidationError extends Error {
  constructor() {
    super(`Invalid or not existing property`)
    this.name = 'ValidationError'
  }
}

module.exports = ValidationError