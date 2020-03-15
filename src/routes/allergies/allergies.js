const express = require('express')

const { listAllergies, getAllergyByCodeOrName} = require('../../utils/services/allergies')
const { createValidationError }  = require('../../utils/errors/ValidationError')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const allergies = listAllergies()
  res.send({
    allergies
  })
})

router.get('/query', async (req, res, next) => {
  try {
    const allergyCode = req.query.code
    
    if(!allergyCode) {
      const error = createValidationError({errorArray: [], property: 'code'})
      throw error
    }

    const allergy = getAllergyByCodeOrName(allergyCode)
    res.send(allergy)

  } catch (error) {
    res.status(400)
    next(error)
  }
})

module.exports = router