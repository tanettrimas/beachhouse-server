const ValidationService = require('../../../utils/services/validation')
const createArrayValidate = check => ({ field, optional = false }) => {
    if(!ValidationService.isValidString(field)) {
      throw new Error(`Provided field ${field} must be a string`)
    }
  
    let validationChain = check(field).isArray()
  
    if (optional) {
      return validationChain
        .optional({ checkFalsy: true, nullable: true})
    }
    
    return validationChain
  }

module.exports = createArrayValidate