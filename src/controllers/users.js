const createUser = require('../models/user')
const deletePropAndReturnModified = require('../utils/deletePropReturnModifies')
const tokenService = require('../utils/services/token')

const createUsersController = ({ databaseController, deps: { bcrypt } = {} }) => {
  async function addUser (userInfo) {
      const User = createUser(userInfo)
      if(User.errors) {
        return User
      }
      const userFromDb = await findExistingUser(User.getUsername())
      if(userFromDb) {
        return userFromDb
      }

      const userToInsert = {
        username: User.getUsername(),
        password: await bcrypt.hash(User.getPassword(), 10),
        role: User.getRole()
      }
      const insertedUser = await databaseController.add(userToInsert)
      return deletePropAndReturnModified('password', insertedUser)
  } 

  async function findExistingUser(username) {
    const existingUser = await databaseController.checkIfUserExists(username)
    if(existingUser) {
      return Object.freeze({
        exists: true,
        ...existingUser
      })
    }
    return false
  }

  async function login({ username, password }) {
    const existingUser = await findExistingUser(username)
    if(!existingUser) {
      return false
    }
    const doesMatch = await bcrypt.compare(password, existingUser.password) 
    if (doesMatch) {
      // send JWT
      try {
        const token = await tokenService.createToken(existingUser)
        return Object.freeze({ token })
      } catch (error) {
        throw new Error('Unable to login')
      }
    } 
    return false
  }

  async function listUsers() {
    const users = await databaseController.list()
    const returnItems = users.map(({ id, password, ...rest}) => {
      return Object.freeze({ id, ...rest })
    })
    return returnItems
  }

  return {
    addUser,
    listUsers,
    login
  }
}



module.exports = createUsersController

