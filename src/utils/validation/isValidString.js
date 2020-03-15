const isValidString = (str, REQUIRED_LENGTH_PROPERTY = 3) => {
  return !!str 
    && typeof str === 'string' 
    && typeof REQUIRED_LENGTH_PROPERTY === "number" 
    && REQUIRED_LENGTH_PROPERTY > 0 
    && str.trim().length >= REQUIRED_LENGTH_PROPERTY
}

module.exports = isValidString