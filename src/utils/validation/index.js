const isValidArray = require('./isValidArray')
const isValidString = require('./isValidString')
const isValidNumber = require('./isValidNumber')

const ValidationService = Object.freeze({
  isValidArray,
  isValidString,
  isValidNumber
})

module.exports = ValidationService