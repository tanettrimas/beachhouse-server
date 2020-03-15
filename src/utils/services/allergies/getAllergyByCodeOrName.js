const allergies = require('./allergyList')

module.exports = code => {
  if(!code || typeof code !== 'string') {
    throw new Error('Invalid or not existing property')
  }

  return Object.freeze(allergies.find(item => item.code === code || item.nameNO === code))
}


