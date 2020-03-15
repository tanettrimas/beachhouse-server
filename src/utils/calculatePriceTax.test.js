const calculatePriceTax = require('./calculatePriceTax')

describe('calculatePriceTax', () => {
  it('Happy path', () => {
    expect(calculatePriceTax(150, 1.26)).toBeUndefined()
    expect(calculatePriceTax('150', '1.26')).toBeUndefined()
    expect(calculatePriceTax('150', 123)).toBeUndefined()
    expect(calculatePriceTax(150, '123')).toBeUndefined()
    expect(calculatePriceTax(100, 1.15)).toBe(115)
    expect(calculatePriceTax(100, 1.25)).toBe(125)
    expect(typeof calculatePriceTax(100, 1.25)).toBe('number')
  })
})