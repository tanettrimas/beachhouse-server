const ValidationError = require('../../utils/ValidationError')

function makeCreateMenuItem({ crypto, getAllergyByCodeOrName, calculatePriceTax }) {
  return function createMenuItem({ title, category, price, allergies, menuNumber } = {}) {
    const REQUIRED_LENGTH_PROPERTY = 3

    let result = {}
    let errors = []

    if(!title || title.trim().length < REQUIRED_LENGTH_PROPERTY || typeof title !== 'string') {
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
  
    if(!category || category.trim().length < REQUIRED_LENGTH_PROPERTY || typeof category !== 'string') {
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