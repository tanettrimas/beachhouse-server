const ValidationService = require('../../utils/services/validation')
const { createValidationError } = require('../../utils/errors/ValidationError')

const makeCreateUser = require('./user')
const createUser = makeCreateUser({ ValidationService, createValidationError })

module.exports = createUser