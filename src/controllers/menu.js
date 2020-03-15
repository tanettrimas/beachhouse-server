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

  async function updateMenuItem(menuInfo) {
    const menuItem = createMenuItem(menuInfo)

    if(menuItem.errors) {
      return menuItem
    }

    if(!menuItem.getId()) {
      console.log('reached')
      return
    }

    const menuItemToUpdate = Object.freeze({
      id: menuItem.getId(),
      title: menuItem.getTitle(),
      number: menuItem.getNumber(),
      price: menuItem.getPrice(),
      category: menuItem.getCategory(),
      allergies: menuItem.getAllergies(),
      hash: menuItem.getHash()
    })

    return databaseController.update(menuItemToUpdate)
  }

  //TODO
  async function deleteMenuItem(menuInfo) {}

  return {
    addMenuItem,
    listMenuItems,
    updateMenuItem,
    deleteMenuItem
  }
}

module.exports = createMenuController