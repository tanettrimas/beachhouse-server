const crypto = require('crypto')

const calculatePriceTax = require('../../utils/calculatePriceTax')
const { getAllergyByCodeOrName } = require('../../utils/allergies')
const makeCreateMenuItem = require('./menu')

const createMenuItem = makeCreateMenuItem({ calculatePriceTax, getAllergyByCodeOrName, crypto})

module.exports = createMenuItem