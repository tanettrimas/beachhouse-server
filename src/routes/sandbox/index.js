const express = require('express')
const { check } = require('express-validator')

const {validate} = require('../middlewares/validation')

const router = express.Router()

router.post('/test', validate([
    check('username').isEmail().withMessage('Not valid email').normalizeEmail(), 
    check('password').isLength({ min: 5 }).withMessage('Is not long enough').isURL().withMessage('Is not url')
  ]), async (req, res, next) => {
    console.log(req.body)
  res.send({ message: 'OK!'})
})

module.exports = router