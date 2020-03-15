const ValidationError = require('../../utils/ValidationError')

function makeCreateMenuItem({ crypto, getAllergyByCodeOrName, listAllergies, calculatePriceTax }) {
  return function createMenuItem({ title, category, price, allergies, menuNumber } = {}) {
    const REQUIRED_LENGTH_PROPERTY = 3
    const VALID_ALLERGY_CODES = listAllergies().map(item => item.code)
    const onlyValidAllergies = allergies.every(item => VALID_ALLERGY_CODES.includes(item))
    let result = {}
    let errors = []

    if(!title || typeof title !== 'string' || title.trim().length < REQUIRED_LENGTH_PROPERTY || typeof title !== 'string') {
      errors.push({
        message: new ValidationError().message,
        property: 'title'
      })
    }
  
    if(!allergies || !allergies.length) {
      errors.push({
        message: new ValidationError().message,
        property: 'allergies'
      })
    }

    if(!onlyValidAllergies) {
      errors.push({
        message: new Error('Property includes invalid arguments, check the /allergies for valid arguments').message,
        property: 'allergies'
      })
    }
  
    if(!price || typeof price !== 'number') {
      errors.push({
        message: new ValidationError().message,
        property: 'price'
      })
    }

    if(!menuNumber || typeof menuNumber !== 'number') {
      errors.push({
        message: new ValidationError().message,
        property: 'menuNumber'
      })
    }
  
    if(!category || typeof category !== 'string' || category.trim().length < REQUIRED_LENGTH_PROPERTY) {
      errors.push({
        message: new ValidationError().message,
        property: 'category'
      })
    }

    if(errors.length) {
      result.errors = errors
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