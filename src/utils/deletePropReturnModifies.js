function deletePropAndReturnModified(prop, obj = {}) {
  const returnObject = {
    ...obj
  }
  if(returnObject[prop]) {
    delete returnObject[prop]
    return returnObject
  }
  return false
}

module.exports = deletePropAndReturnModified