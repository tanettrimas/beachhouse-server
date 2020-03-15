const createMenuItem = require('../models/menu')

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

      const menuItemToInsert = Object.freeze({
        title: menuItem.getTitle(),
        hash: menuItem.getHash(),
        number: menuItem.getNumber(),
        price: menuItem.getPrice(),
        category: menuItem.getCategory(),
        allergies: menuItem.getAllergies()
      })
      return await databaseController.add(menuItemToInsert)
  } 
    

  async function listMenuItems() {
    return databaseController.list()
  }

  return {
    addMenuItem,
    listMenuItems
  }
}

module.exports = createMenuController