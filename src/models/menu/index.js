const crypto = require('crypto')

const calculatePriceTax = require('../../utils/calculatePriceTax')
const { getAllergyByCodeOrName, listAllergies } = require('../../utils/allergies')
const makeCreateMenuItem = require('./menu')

const createMenuItem = makeCreateMenuItem({ calculatePriceTax, getAllergyByCodeOrName, listAllergies, crypto})

module.exports = createMenuItem