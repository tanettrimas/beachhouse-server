const createMenuController = require('./menu')
const mockDatabaseController = require('../mocks/DatabaseController')

const menuController = createMenuController({ databaseController: mockDatabaseController })

describe('menuController.addMenuItem', () => {
  it('Does not accept invalid properties', async () => {
    const item1 = await menuController.addMenuItem({})
    expect(item1).toHaveProperty('errors')
    expect(item1.errors.length).toBe(5)

    const item2 = await menuController.addMenuItem({ 
        allergies: ['MU'],
        category: 'milk',
        price: 12,
        title: 'My test',
        menuNumber: '1'
      })

    expect(item2).toHaveProperty('errors')
    expect(item2.errors.length).toBe(1)    
  })

  it('returns a valid menu item', async () => {
    const menuItem = await menuController.addMenuItem({
      allergies: ['MU', 'F'],
      category: 'sushi',
      price: 159,
      title: 'my test item',
      menuNumber: 1
    })

    const items = await menuController.listMenuItems()
    
    expect(items.length).toBe(1)
    expect(menuItem).toEqual({
      title: 'my test item',
      hash: 'b1376ebfc64f6ec7c0e1248512e83de0',
      number: 1,
      price: { takeAway: 182.85, sitHere: 198.75 },
      category: 'sushi',
      allergies: [ 'MU', 'F' ]
    })
  })
})

  




