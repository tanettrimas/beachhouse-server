const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')

const app = express()

const menuRouter = require('./routes/menu')
const allergyRouter = require('./routes/allergies')

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))

app.use('/menu', menuRouter)
app.use('/allergies', allergyRouter)

app.use((req, res, next) => {
  const error = new Error('Route not found')
  res.status(404)
  next(error)
})

app.use((err, req, res, next) => {
  // TODO: Add logging to data pool?
  res.status(res.statusCode === 200 ? 500 : res.statusCode)
  console.log(err.stack)
  res.send({
    status: res.statusCode,
    error: err.length ? err : err.message
  })
})

module.exports = app