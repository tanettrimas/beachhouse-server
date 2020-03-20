function makeCreateMenuItem({ crypto, listAllergies, calculatePriceTax, ValidationService, createValidationError, isValidId }) {
  return function createMenuItem({ title, category, price, allergies, number, id } = {}) {
    const REQUIRED_LENGTH_PROPERTY = 3
    let result = {}
    let errorArray = []
    let resultToHash

    if(!ValidationService.isValidString(title, REQUIRED_LENGTH_PROPERTY)) {
      errorArray = createValidationError({ errorArray, property: 'title' })
    }
  
    if(!ValidationService.isValidArray(allergies)) {
      errorArray = createValidationError({ errorArray, property: 'allergies' })
    } else {
      // Check valid allergies
      const VALID_ALLERGY_CODES = listAllergies().map(item => item.code)
      const onlyValidAllergies = allergies.every(item => VALID_ALLERGY_CODES.includes(item))

      if(!onlyValidAllergies) {
        errorArray = createValidationError({ errorArray, error: new RangeError('Property includes invalid arguments, check the /allergies for valid arguments'), property: 'allergies' })
      }
    }

    if(!ValidationService.isValidNumber(price)) {
      errorArray = createValidationError({ errorArray, property: 'price' })
    }

    if(!ValidationService.isValidNumber(number)) {
      errorArray = createValidationError({ errorArray, property: 'number' })
    }
  
    if(!ValidationService.isValidString(category)) {
      errorArray = createValidationError({ errorArray, property: 'category' })
    }
    if(ValidationService.isValidString(id) && ValidationService.isValidId(id)) {
      result.id = id
    }

    if(errorArray.length) {
      result.errors = errorArray
      return result
    }    
    
    result = {
      ...result,
      title,
      number,
      category,
      price: Object.freeze({
        initialPrice: price,
        takeAway: calculatePriceTax(price, 1.15),
        sitHere: calculatePriceTax(price, 1.25)
      }),
      allergies: Object.freeze(allergies)
    }

    // For PUT requests, not hashing with the id
    if(result.id) {
      const { id, ...rest} = result
      resultToHash = {
        ...rest
      }
    } else {
      resultToHash = {
        ...result
      }
    }
    const hash = crypto.createHash('md5').update(JSON.stringify(resultToHash)).digest('hex')
    return Object.freeze({
      getTitle: () => result.title,
      getCategory: () => result.category,
      getPrice: () => result.price,
      getAllergies: () => result.allergies,
      getHash: () => hash,
      getNumber: () => result.number,
      getId: () => result.id
    })
  } 
}

module.exports = makeCreateMenuItem