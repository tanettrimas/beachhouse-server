const express = require('express')
const logger = require('morgan')
const app = express()

const menuRouter = require('./routes/menu')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use('/menu', menuRouter)

app.use((req, res) => {
    return res.status(404).send({
    message: 'Sorry, could not find that route!'
  })
})

app.use((err, req, res, next) => {
  // TODO: Add logging to data pool?
  res.status(res.statusCode === 200 ? 500 : res.statusCode)

  res.send({
    status: res.statusCode,
    errors: err
  })
})

module.exports = app