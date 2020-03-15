const { getAllergyByCodeOrName } = require('./index')

describe('getAllergyByCodeOrName', () => {
  it('needs param to be a string', () => {
    const code = /fish/
    expect(() => {
      getAllergyByCodeOrName(code)
    }).toThrow()
  })

  it('returns only one item', () => {
    const allergy = getAllergyByCodeOrName('MU')
    expect(allergy).not.toHaveProperty('length')
    expect(Array.isArray(allergy)).toBe(false)
  })

  it('has the correct properties', () => {
    const allergy = getAllergyByCodeOrName('fisk')
    expect(allergy).toHaveProperty('nameNO')
    expect(allergy).toHaveProperty('nameEN')
    expect(allergy).toHaveProperty('code')
  })

  it('throws if not found', () => {
    expect(() => {
      getAllergyByCodeOrName('somethingnotexistent').toThrow()
    })
  })
})