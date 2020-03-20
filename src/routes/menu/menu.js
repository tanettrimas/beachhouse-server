const express = require('express')

const createDatabaseController = require('../../controllers/database')
const createMenuController = require('../../controllers/menu')

const router = express.Router()

const databaseController = createDatabaseController('menu')
const menuController = createMenuController({ databaseController })

router.get("/", async (req, res, next) => {
  try {
    const items = await menuController.listMenuItems()
    const returnItems = items.map(item => ({...item, url: `/menu/${item.id}`}))
    res.send({
      message: 'Response successful!',
      data: returnItems,
      length: items.length
    })
  } catch (error) {
    next(error)
  }
})

router.post('/new', async (req, res, next) => {
    try {
      const item = await menuController.addMenuItem(req.body)
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
    const item = await menuController.updateMenuItem(req.params.id, req.body)

    if(item === null) {
      return res.sendStatus(204)
    }

    res.send({ message: "Resource updated", data: item})
  } catch (error) {
    if(error.message === "Item not found") {
      res.status(404)
    } else {
      res.status(422)
    }
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const item = await menuController.getItemById(req.params.id)
    res.send({ data: item })
  } catch (error) {
    if(error.message === "Item not found") {
      res.status(404)
    } else {
      res.status(422)
    }
    next(error)
  }
})

module.exports = router