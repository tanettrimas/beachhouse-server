const express = require('express')
const bcrypt = require('bcrypt')
// const {check} = require('express-validator')

const router = express.Router()

const checkAuth = require('../middlewares/auth/checkAuth')
const createController = require('../utils/setup')
const createUserController = require('../../controllers/users')
const { validate, makeBuildValidator, createValidator } = require('../middlewares/validation')
// Setup
const check = makeBuildValidator('body')
const stringValidate = createValidator.makeStringValidate(check)
const userController = createController('users', createUserController, { bcrypt })

router.post('/create', checkAuth({ requiresAdmin: true }), validate([
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

router.get('/', async (req, res, next) => {
  try {
    const users = await userController.listUsers()
    res.responseValue = users
    next()
  } catch (error) {
    next(error)
  }
})

router.post('/login', validate([
  stringValidate({ field: 'username' }).isEmail().normalizeEmail(),
  stringValidate({ field: 'password', minLength: 8 })
]), async (req, res, next) => {
  try {
    // Find user by email, try to log in and retrieve access token if successful
    const loginCredentials = await userController.login(req.body)
    if(!loginCredentials) {
      res.status(401)
      throw new Error('Unable to login')
    }
    res.responseValue = loginCredentials
    next()
    // add middleware to protected routes
  } catch (error) {
    next(error)
  }
})

module.exports = router