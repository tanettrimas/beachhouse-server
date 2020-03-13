const express = require('express')
const logger = require('morgan')

const app = express()

const menuRouter = require('./routes/menu')

app.use(logger('dev'))

app.use('/menu', menuRouter)

app.use((err, req, res, next) => {
  console.log(res)
  res.send({
    message: err.message
  })
})

module.exports = app