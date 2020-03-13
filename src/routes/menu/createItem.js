const { getAllergyByCodeOrName } = require('./allergies')

const createItem = ({
  title, 
  category, 
  price,
  allergies
} = {}) => {
  if(!title || typeof title !== 'string') {
    throw new Error('Invalid or not existing property')
  }

  if(!allergies || !allergies.length) {
    throw new Error('Invalid or not existing property')
  }

  if(!price || typeof price !== 'number') {
    throw new Error('Invalid or not existing property')
  }

  if(!category || typeof category !== 'string') {
    throw new Error('Invalid or not existing property')
  }

  return {
    title,
    category,
    price,
    allergies: allergies.map(allergy => {
      return getAllergyByCodeOrName(allergy)
    })
  }
} 

module.exports = createItem