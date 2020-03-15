const { ValidationError, createValidationError } = require('./ValidationError')

describe('ValidationError', () => {
  let errors = []

  it('returns empty on invalid input', () => {
    expect(() => {
      errors = createValidationError({ errorArray: errors, property: 'test', error: "" })
    }).toThrow(`Property error of value string needs to be an Error`)

    expect(() => {
      errors = createValidationError({ errorArray: "hello", property: 'test'})
    }).toThrow(`Property errorArray of value string needs to be an Array`)

    expect(() => {
      errors = createValidationError({ errorArray: errors, error: new Error('test')})
    }).toThrow(`Property property of value undefined needs to be a string`)

    expect(() => {
      errors = createValidationError({ errorArray: errors, error: new Error('test'), property: 1})
    }).toThrow(`Property property of value number needs to be a string`)

    expect(errors.length).toBe(0)
  })

  it('happy path', () => {
    const validationError = new ValidationError()
    expect(validationError.message).toBe('Invalid or not existing property')
    errors = createValidationError({errorArray: errors, property: 'test', error: new Error('My test')})

    expect(errors).toEqual([ { name: 'Error', message: 'My test', property: 'test' } ])
    errors = createValidationError({errorArray: errors, property: 'mouse'})
    
    expect(errors[1]).toEqual({
      name: 'ValidationError',
      message: 'Invalid or not existing property',
      property: 'mouse'
    })
  })
})

  