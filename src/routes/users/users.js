const express = require('express')
const bcrypt = require('bcrypt')
// const {check} = require('express-validator')

const router = express.Router()


const createController = require('../utils/setup')
const createUserController = require('../../controllers/users')
const { validate, makeBuildValidator, createValidator } = require('../middlewares/validation')
// Setup
const check = makeBuildValidator('body')
const stringValidate = createValidator.makeStringValidate(check)
const numberValidate = createValidator.makeNumberValidate(check)
const arrayValidate = createValidator.makeArrayValidate(check)
const userController = createController('users', createUserController, { bcrypt })

router.post('/create', validate([
  stringValidate({ field: 'username' }).isEmail().normalizeEmail(),
  stringValidate({ field: 'password', minLength: 8 })
]), async (req, res, next) => {
  try {
    const User = await userController.addUser(req.body)
    if(User.errors) {
      res.status(422)
      throw User.errors
    }

    if(User.exists) {
      res.status(422)
      throw new Error('User already exists')
    }
    res.status(201)
    res.responseValue = User
    next()
  } catch (error) {
    next(error)
  }
  
})

module.exports = router