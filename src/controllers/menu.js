const createMenuItem = require('../models/menu')
const isValidId = require('../utils/isValidId')

const createMenuController = ({ databaseController }) => {
  async function addMenuItem (menuInfo) {
      const menuItem = createMenuItem(menuInfo)
      
      if(menuItem.errors) {
        return menuItem
      }
      const existingItem = await databaseController.findByHash(menuItem)

      if(existingItem) {
        console.log('Item exists in db')
        return Object.freeze({
          exists: true,
          ...existingItem
        })
      }
      const menuItemToInsert = Object.freeze(getValues(menuItem))
      return await databaseController.add(menuItemToInsert)
  } 
    

  async function listMenuItems() {
    return databaseController.list()
  }

  async function updateMenuItem(id, body) {
    if(!isValidId(id)) {
      throw new Error('Invalid id')
    }

    const item = await databaseController.findById(id)
    if(!item) {
      throw new Error('Item not found')
    }

    const { id: menuId, price, ...rest} = item
    const menuItem = createMenuItem({ id: menuId, price: price.initialPrice, ...rest })
    if(menuItem.errors) {
      return menuItem
    }
    // Running it through the validation again if the body has invalid parameters
    const itemNew = constructMenuItem(menuItem, body)
    const toUpdate = createMenuItem(itemNew)
    if(toUpdate.errors) {
      return toUpdate
    }
    const updated = await databaseController.update({ id: menuId, ...getValues(toUpdate)})
    return updated
  }

  async function getItemById(id) {
    if(!isValidId(id)) {
      throw new Error('Invalid id')
    }

    const item = await databaseController.findById(id)
    return item
  }

  //TODO
  async function deleteMenuItem(id) {
    if(!isValidId(id)) {
      throw new Error('Invalid id')
    }
    const item = await databaseController.findById(id)
    const deleted = await databaseController.remove(item.id)
    return deleted 
  }

  return {
    addMenuItem,
    listMenuItems,
    updateMenuItem,
    deleteMenuItem,
    getItemById
  }
}

module.exports = createMenuController

function constructMenuItem(menuItem, body) {
  const menuObject = getValues(menuItem)
  const validKeys = Object.keys(menuObject)

  if(body && Object.keys(body).every(item => validKeys.includes(item))) {
    let newBody = {}
    // If the price does not change, get the initial price from the DB
    if (typeof menuObject.price === "object") {
      newBody = {
        ...menuObject,
        ...body,
        price: Object.freeze(menuObject.price.initialPrice)
      }
    } else {
      newBody = {
        ...menuObject,
        ...body
      }
    }
    return Object.freeze(newBody)
  }
  throw new Error('The request contains invalid values')
}

function getValues(menuItem) {
  return Object.freeze({
    title: menuItem.getTitle(),
    hash: menuItem.getHash(),
    number: menuItem.getNumber(),
    price: menuItem.getPrice(),
    category: menuItem.getCategory(),
    allergies: menuItem.getAllergies()
  })
}