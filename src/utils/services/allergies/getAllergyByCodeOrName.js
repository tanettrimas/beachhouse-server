const listAllergies = require('./listAllergies')
const { ValidationError } = require('../../errors/ValidationError')
const { isValidString} = require('../validation')

module.exports = code => {
  if(!isValidString(code, 1)) {
    throw new ValidationError()
  }

  if(!listAllergies()
    .map(allergy => ({ code: allergy.code, nameNO: allergy.nameNO}))
    .some(item => item.code === code || item.nameNO === code)
  ) {
    throw new RangeError('Allergy not found')
  }

  return Object.freeze(listAllergies().find(item => item.code === code || item.nameNO === code))
}


