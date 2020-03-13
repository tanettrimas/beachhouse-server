const createItem = require('./createItem')

describe('createItem', () => {
  it('throws on invalid input', () => {
    /* missing properties */ 
    expect(() => {
      createItem({
        allergies: ['MU', 'F'],
        category: 'sushi', 
        price: 159
      })
    }).toThrow()
    
    expect(() => {
      createItem({
        title: 'nono',
        category: 'sushi', 
        price: 159
      })
    }).toThrow()  

    expect(() => {
      createItem({
        allergies: ['MU', 'F'],
        title: 'sushi', 
        price: 159
      })
    }).toThrow()  

    expect(() => {
      createItem({
        allergies: ['MU', 'F'],
        category: 'sushi', 
        title: 'my title',
      })
    }).toThrow()
    
    /* invalid properties */
    expect(() => {
      createItem({
        allergies: ['MU', 'F'],
        category: 'sushi', 
        title: 123,
        price: 234
      })
    }).toThrow()

    expect(() => {
      createItem({
        allergies: ['MU', 'F'],
        category: 'sushi', 
        title: 123,
        price: '234'
      })
    }).toThrow()

    expect(() => {
      createItem({
        allergies: ['MU', 'F'],
        category: 123, 
        title: '123',
        price: 123
      })
    }).toThrow()

    expect(() => {
      createItem({
        allergies: [],
        category: '123', 
        title: '123',
        price: 123
      })
    }).toThrow()
  })

  it('returns a valid menu item', () => {
    const actual = createItem({
      allergies: ['MU', 'F'],
      category: 'sushi',
      price: 159,
      title: 'my test item'
    })

    expect(actual).toEqual({
      title: 'my test item', 
      price: 159, 
      category: 'sushi',
      allergies: [
        {
          code: 'MU',
          nameNO: 'sennep', 
          nameEN: 'mustard'
        }, 
        { 
          code: 'F', 
          nameNO: 'fisk', 
          nameEN: 'fish' 
        }
      ]
    })
  })
})