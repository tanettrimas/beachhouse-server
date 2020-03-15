const ValidationSerivce = require('../services/validation') 

class ValidationError extends Error {
  constructor() {
    super(`Invalid or not existing property`)
    this.name = 'ValidationError'
  }
}

function createValidationError ({ errorArray, error = new ValidationError(), property}) {
  if(error instanceof Error === false) {
    throw new Error(`Property error of value ${typeof error} needs to be an Error`)
  }

  if(!Array.isArray(errorArray)) {
    throw new Error(`Property errorArray of value ${typeof errorArray} needs to be an Array`)
  }

  if(!ValidationSerivce.isValidString(property, 1)) {
    throw new Error(`Property property of value ${typeof property} needs to be a string`)
  }

  return Object.freeze([...errorArray, { name: error.name, message: error.message, property }])
}

module.exports = { ValidationError, createValidationError }