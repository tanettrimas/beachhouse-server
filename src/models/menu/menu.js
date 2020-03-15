function makeCreateMenuItem({ crypto, getAllergyByCodeOrName, listAllergies, calculatePriceTax, ValidationService, createValidationError }) {
  return function createMenuItem({ title, category, price, allergies, menuNumber } = {}) {
    const REQUIRED_LENGTH_PROPERTY = 3
    let result = {}
    let errorArray = []

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

    if(!ValidationService.isValidNumber(menuNumber)) {
      errorArray = createValidationError({ errorArray, property: 'menuNumber' })
    }
  
    if(!ValidationService.isValidString(category)) {
      errorArray = createValidationError({ errorArray, property: 'category' })
    }

    // If it exist errorArray
    if(errorArray.length) {
      result.errors = errorArray
      return result
    }
  
    result = {
      title,
      number: menuNumber,
      category,
      price: Object.freeze({
        takeAway: calculatePriceTax(price, 1.15),
        sitHere: calculatePriceTax(price, 1.25)
      }),
      allergies: Object.freeze(allergies.map(allergy => {
        return getAllergyByCodeOrName(allergy)
      }))
    }

    const hash = crypto.createHash('md5').update(JSON.stringify(result)).digest('hex')
  
    return Object.freeze({
      getTitle: () => result.title,
      getCategory: () => result.category,
      getPrice: () => result.price,
      getAllergies: () => result.allergies,
      getHash: () => hash,
      getNumber: () => result.number
    })
  } 
}

module.exports = makeCreateMenuItem