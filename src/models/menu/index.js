const crypto = require('crypto')
const { createValidationError } = require('../../utils/errors/ValidationError')
const ValidationService = require('../../utils/services/validation')
const calculatePriceTax = require('../../utils/calculatePriceTax')
const { listAllergies } = require('../../utils/services/allergies')

const makeCreateMenuItem = require('./menu')
const createMenuItem = makeCreateMenuItem({ calculatePriceTax, listAllergies, crypto, ValidationService, createValidationError})

module.exports = createMenuItem