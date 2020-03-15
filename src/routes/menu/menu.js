const express = require('express')

const createDatabaseController = require('../../controllers/database')
const createMenuController = require('../../controllers/menu')

const router = express.Router()

const databaseController = createDatabaseController('menu')
const menuController = createMenuController({ databaseController })

router.get("/", async (req, res, next) => {
  try {
    const items = await menuController.listMenuItems()
    res.send({
      message: 'Response successful!',
      data: items,
      length: items.length
    })
  } catch (error) {
    next(error)
  }
})

router.post('/new', async (req, res, next) => {
    // post-endpoint
    try {
      const item = await menuController.addMenuItem(req.body)
      // Sending the error array to the error-handler
      if(item.errors) {
        res.status(422)
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
      next(error)
    }
})

router.put('/:id', async (req, res, next) => {
  try {
    const item = await menuController.updateMenuItem({
      id: req.params.id,
      ...req.body
    })

    if(typeof item === 'undefined') {
      res.status(404)
      throw new RangeError('Item not found')
    }

    if(item === null) {
      return res.sendStatus(204)
    }

    if(item && item.errors) {
      res.status(400)
      throw item.errors
    }

    res.status(200).send({
      ...item
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router