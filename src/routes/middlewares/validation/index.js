const { validationResult, buildCheckFunction } = require('express-validator')
const makeStringValidate = require('./string-validate')
const makeNumberValidate = require('./num-validate')
const VALID_CHECK_FIELDS = ['body', 'cookies', 'headers', 'params', 'query']

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422)
    next(errors.array({ onlyFirstError: true }))
  };
};

const makeBuildValidator = (...checkFields) => {
  if(!checkFields.every(field => VALID_CHECK_FIELDS.includes(field))) {
    throw new Error('Invalid check fields provided')
  } 

  return buildCheckFunction([...checkFields])
}

const createValidator = Object.freeze({
  makeStringValidate, 
  makeNumberValidate
})

module.exports = Object.freeze({ validate, makeBuildValidator, createValidator })