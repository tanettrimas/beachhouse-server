const ValidationService = require('../../../utils/services/validation')

const makeStringValidate = check => ({ field, minLength = 3, optional = false }) => {
  if(!ValidationService.isValidNumber(minLength)) {
    throw new Error(`Provided field ${field} must be a number`)
  }

  if(!ValidationService.isValidString(field, minLength)) {
    throw new Error(`Provided field ${field} must be a string`)
  }

  if (optional) {
    return check(field)
      .isLength({ min: minLength})
      .trim()
      .escape()
      .optional({ checkFalsy: true, nullable: true})
  }

  return check(field)
    .isLength({ min: minLength})
    .trim()
    .escape()
}

module.exports = makeStringValidate

// body('title').isLength({ min: 3 }).trim().escape()