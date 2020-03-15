const isValidNumber = require('./isValidNumber')

describe('isValidNumber', () => {
  it('returns false on invalid input', () => {
    expect(isValidNumber("1")).toBe(false)
    expect(isValidNumber(-1)).toBe(false)
    expect(isValidNumber(0)).toBe(false)
    expect(isValidNumber(["1"])).toBe(false)
    expect(isValidNumber({num: "1"})).toBe(false)
  })
  it('happy path', () => {
    expect(isValidNumber(2)).toBe(true)
    expect(isValidNumber(0.5)).toBe(true)
    expect(isValidNumber(99.99999)).toBe(true)
  })
})