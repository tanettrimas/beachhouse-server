const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const { v4: uuid} = require('uuid')

const app = express()
const formatResponse = require('./routes/middlewares/formatResponse')

const menuRouter = require('./routes/menu')
const allergyRouter = require('./routes/allergies')
const usersRouter = require('./routes/users')

app.use((req, res, next) => {
  req.requestId = uuid()
  res.set('x-request-id', req.requestId)
  next()
})
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))

app.use('/menu', menuRouter, formatResponse)
app.use('/allergies', allergyRouter, formatResponse)
app.use('/users', usersRouter, formatResponse)

app.use((req, res, next) => {
  const error = new Error('Route not found')
  res.status(404)
  next(error)
})

app.use((err, req, res, next) => {
  // TODO: Add logging to data pool?
  res.status(res.statusCode === 200 ? 500 : res.statusCode)
  if(err instanceof SyntaxError) {
    res.status(400)
  }

  if (err instanceof TypeError) {
    //Here you can log before showing generic error message to user
    console.log(err)
    res.status(500)
    err = new Error('Unforseen error occurred')
  }
  res.send({
    method: req.method,
    requestId: req.requestId,
    route: req.path,
    status: res.statusCode,
    error: err.length ? err : err.message,
    stacktrace: process.env.NODE_ENV !== 'production' ? err.stack : null
  })
})

module.exports = app