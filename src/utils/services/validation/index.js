const isValidArray = require('./isValidArray')
const isValidString = require('./isValidString')
const isValidNumber = require('./isValidNumber')
const isValidId = require('./isValidId')

const ValidationService = Object.freeze({
  isValidId,
  isValidArray,
  isValidString,
  isValidNumber
})

module.exports = ValidationService