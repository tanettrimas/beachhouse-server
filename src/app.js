const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const { v4: uuid} = require('uuid')

const app = express()

const menuRouter = require('./routes/menu')
const allergyRouter = require('./routes/allergies')
const sandboxRouter = require('./routes/sandbox')
const formatResponse = require('./routes/middlewares/formatResponse')

app.use((req, res, next) => {
  req.requestId = uuid()
  next()
})
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))

app.use('/menu', menuRouter, formatResponse)
app.use('/allergies', allergyRouter, formatResponse)

// Only for testing, remove before prod
app.use('/sandbox', sandboxRouter, formatResponse)

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
  res.set('x-request-id', req.requestId)

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