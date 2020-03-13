const express = require('express')

const router = express.Router()

router.get("/", async (req, res, next) => {
  res.send({
    message: 'OK from this path ' + req.baseUrl
  })
})

module.exports = router