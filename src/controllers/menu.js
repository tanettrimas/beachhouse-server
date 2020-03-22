const createMenuItem = require('../models/menu')
const ValidationService = require('../utils/services/validation')

const createMenuController = ({ databaseController }) => {
  async function addMenuItem (menuInfo) {
      const menuItem = createMenuItem(menuInfo)
      
      if(menuItem.errors) {
        return menuItem
      }
      const existingMenuItem = await databaseController.findByHash(menuItem)
      if(existingMenuItem) {
        return Object.freeze({
          exists: true,
          ...existingMenuItem
        })
      }
      const menuItemToInsert = getValues(menuItem)
      return await databaseController.add({ 
        ...menuItemToInsert,
        hash: menuItem.getHash()
      })
  } 
    

  async function listMenuItems() {
    const menuItems = await databaseController.list()
    return menuItems
  }

  async function updateMenuItem(id, body) {
    if(!ValidationService.isValidId(id)) {
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
    const itemNew = constructMenuItemForUpdate(menuItem, body)
    const toUpdate = createMenuItem(itemNew)
    if(toUpdate.errors) {
      return toUpdate
    }
    const updated = await databaseController.update({ id: menuId, hash: toUpdate.getHash(), ...getValues(toUpdate)})
    return updated
  }

  async function getItemById(id) {
    if(!ValidationService.isValidId(id)) {
      throw new Error('Invalid id')
    }

    const item = await databaseController.findById(id)
    return item
  }

  async function deleteMenuItem(id) {
    if(!ValidationService.isValidId(id)) {
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

function constructMenuItemForUpdate(menuItem, body) {
  const menuObject = getValues(menuItem)
  const validKeys = Object.keys(menuObject)

  if(body && Object.keys(body).every(item => validKeys.includes(item))) {
    let newBody = {}
    // If the price does not change, get the initial price from the DB
    if (typeof menuObject.price === "object") {
      newBody = {
        ...menuObject,
        price: Object.freeze(menuObject.price.initialPrice),
        ...body,
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
    number: menuItem.getNumber(),
    price: menuItem.getPrice(),
    category: menuItem.getCategory(),
    allergies: menuItem.getAllergies()
  })
}