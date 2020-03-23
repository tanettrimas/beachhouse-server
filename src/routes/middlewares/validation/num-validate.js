const ValidationService = require('../../../utils/services/validation')
const numValidate = check => ({ field, isFloat, isInt, optional = false }) => {
    if(!ValidationService.isValidString(field)) {
      throw new Error(`Provided field ${field} must be a string`)
    }
  
    let validationChain = check(field).isNumeric()
    if(isFloat && !isInt) {
      validationChain = validationChain.toFloat()
    }
  
    if(isInt && !isFloat) {
      validationChain = validationChain.toInt()
    }
  
    if (optional) {
      return validationChain
        .optional({ checkFalsy: true, nullable: true})
    }
    
    return validationChain
  }

module.exports = numValidate