function deletePropAndReturnModified(prop, obj = {}) {
  const returnObject = {
    ...obj
  }
  if(returnObject[prop]) {
    delete returnObject[prop]
    return Object.freeze(returnObject)
  }
  return Object.freeze(returnObject)
}

module.exports = deletePropAndReturnModified