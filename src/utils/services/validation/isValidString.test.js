const isValidSting = require('./isValidString')

describe('isValidString', () => {
  it('returns false on invalid input', () => {
    expect(isValidSting(1)).toBe(false)
    expect(isValidSting("as")).toBe(false)
    expect(isValidSting("")).toBe(false)
    expect(isValidSting({})).toBe(false)
    expect(isValidSting([1,2,4,4])).toBe(false)
    expect(isValidSting("        ")).toBe(false)
    expect(isValidSting("    sdsf    ", -1)).toBe(false)
    expect(isValidSting("    sdsf    ", 0)).toBe(false)
    expect(isValidSting("Nomo", 5)).toBe(false)
  })
  it('happy path', () => {
    expect(isValidSting("Hell")).toBe(true)
    expect(isValidSting("Nomo", 4)).toBe(true)
    expect(isValidSting("Nomo", 3)).toBe(true)
  })
})