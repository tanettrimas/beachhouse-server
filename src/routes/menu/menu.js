const express = require('express')

const createDatabaseController = require('../../db')
const createMenuController = require('../../controllers/menuController')

const router = express.Router()

const databaseController = createDatabaseController('menu')
const menuController = createMenuController({ databaseController })

router.get("/", async (req, res, next) => {
  try {
    const items = await menuController.listMenuItems()
    res.send({
      message: 'Response successful!',
      items
    })
  } catch (error) {
    next(error)
  }
})

router.post('/new', async (req, res, next) => {
    // post-endpoint
    try {
      const item = await menuController.addMenuItem(req.body)
      if(item.errors) {
        throw item.errors
      }

      if(item.exists) {
        const { exists, ...existingItem} = item
        return res.status(200).send({
          ...existingItem
        })
      }

      
      res.status(201).send({
        ...item
      })
    } catch (error) {
      res.status(422)
      next(error)
    }
})

module.exports = router