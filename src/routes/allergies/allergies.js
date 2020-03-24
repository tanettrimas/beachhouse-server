const express = require('express')

const { listAllergies, getAllergyByCodeOrName} = require('../../utils/services/allergies')
const { createValidationError }  = require('../../utils/errors/ValidationError')
const ValidationService = require('../../utils/services/validation')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const allergies = listAllergies()
  res.responseValue = allergies
  next()
})

router.get('/query', async (req, res, next) => {
  try {
    const allergyCode = req.query.code

    if(ValidationService.isValidArray(allergyCode)) {
      res.status(422)
      throw new Error('Multiple parameters not supported')
    }
    
    if(!allergyCode) {
      res.status(400)
      const error = createValidationError({errorArray: [], property: 'code'})
      throw error
    }

    const allergy = getAllergyByCodeOrName(allergyCode)
    res.responseValue = allergy
    next()

  } catch (error) {
    if(error instanceof RangeError) {
      res.status(404)
    }
    next(error)
  }
})

module.exports = router