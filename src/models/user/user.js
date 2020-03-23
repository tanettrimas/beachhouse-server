function makeCreateUser({ ValidationService, createValidationError }) {
  return function createUser({ id, username, password} = {}) {
    const REQUIRED_LENGTH_PROPERTY = 8
    let result = {}
    let errorArray = []
    const validPasswordCombination = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if(!ValidationService.isValidString(username)) {
      errorArray = createValidationError({ errorArray, property: 'username' })
    }

    if(!ValidationService.isValidString(password, REQUIRED_LENGTH_PROPERTY)) {
      errorArray = createValidationError({ errorArray, property: 'password' })
    }

    if(ValidationService.isValidString(id) && ValidationService.isValidId(id)) {
      result.id = id
    }

    if(!validPasswordCombination.test(password)) {
      errorArray = createValidationError({ errorArray, property: 'password', error: new Error('Does not have a valid password combination') })
    }

    if(errorArray.length) {
      result.errors = errorArray
      return result
    }    

    result = {
      ...result,
      username,
      password,
      role: 'user'
    }

    return Object.freeze({
      getId: () => result.id,
      getUsername: () => result.username,
      getRole: () => result.role,
      getPassword: () => result.password
    })
  } 
}

module.exports = makeCreateUser