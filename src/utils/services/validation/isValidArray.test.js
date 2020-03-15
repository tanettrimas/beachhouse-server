const isValidArray = require('./isValidArray')

describe('isValidArray', () => {
  it("returns false on invalid input", () => {
    expect(isValidArray([])).toBe(false)
    expect(isValidArray(123)).toBe(false)
    expect(isValidArray("hello")).toBe(false)
  })
  it('happy path', () => {
    expect(isValidArray(Array.from("hello"))).toBe(true)
    expect(isValidArray([...Array.from("hello")])).toBe(true)
    expect(isValidArray([123, "345"])).toBe(true)
  })
})