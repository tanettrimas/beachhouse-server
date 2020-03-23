const express = require('express')
const { body } = require('express-validator')
const router = express.Router()

const createDatabaseController = require('../../controllers/database')
const createMenuController = require('../../controllers/menu')
const { validate, makeBuildValidator, createValidator } = require('../middlewares/validation')

const check = makeBuildValidator('body')
const stringValidate = createValidator.makeStringValidate(check)
const numberValidate = createValidator.makeNumberValidate(check)
const databaseController = createDatabaseController('menu')
const menuController = createMenuController({ databaseController })

router.get("/", async (req, res, next) => {
  try {
    const items = await menuController.listMenuItems()
    const returnItems = items.map(item => ({...item, url: `/menu/${item.id}`}))
    res.responseValue = returnItems
    next()
  } catch (error) {
    next(error)
  }
})

router.post('/new', validate([
  stringValidate({ field: 'title' }),
  stringValidate({ field: 'category' }),
  numberValidate({ field: 'price', isFloat: true }),
  numberValidate({ field: 'number', isInt: true}),
  body('allergies').isArray()
]), async (req, res, next) => {
    try {
      const item = await menuController.addMenuItem(req.body)
      if(item.errors) {
        res.status(422)
        throw item.errors
      }
      if(item.exists) {
        const { exists, ...existingItem} = item
        res.responseValue = existingItem
        return next()
      }
      res.status(201)
      res.responseValue = item
      next()
    } catch (error) {
      next(error)
    }
})


router.put('/:id', validate([
  body('title').isLength({ min: 3 }).trim().escape().optional({ nullable: true, checkFalsy: true }),
  body('category').isLength({ min: 3}).trim().escape().optional({ nullable: true, checkFalsy: true }),
  body('price').isNumeric().toFloat().optional({ nullable: true, checkFalsy: true }),
  body('number').isNumeric().toInt().optional({ nullable: true, checkFalsy: true }),
  body('allergies').isArray().optional({ nullable: true, checkFalsy: true })
]), async (req, res, next) => {
  console.log(req.body)
  try {
    const item = await menuController.updateMenuItem(req.params.id, req.body)
    if(item === null) {
      return res.sendStatus(204)
    }
    if(item.errors) {
      res.status(422)
      throw item.errors
    }
    res.responseValue = item
    next()
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
    res.responseValue = item
    next()
  } catch (error) {
    if(error.message === "Item not found") {
      res.status(404)
    } else {
      res.status(422)
    }
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await menuController.deleteMenuItem(req.params.id)
    if(deleted) {
      res.responseValue = `Object ${req.params.id} was successfully deleted`
      next()
    } else {
      throw new Error("Something went wrong during delete")
    }
  } catch (error) {
    res.status(422)
    next(error)
  }
})

module.exports = router