const { makeDb, objectId} = require('../db/connect')

const makeCreateDatabaseController = ({ db, objectId }) => (tableName) => {
  return {
    add,
    list,
    remove,
    update,
    findByHash,
    findById,
    checkIfUserExists
  }

  async function checkIfUserExists(username) {
    const database = await db()
    const user = await database.collection(tableName).findOne({ username }) 
    if(user) {
      const { _id, ...existingInfo } = user
      return Object.freeze({ id: `${_id}`, ...existingInfo })
    }
    return false
  }

  async function findById(id) {
    const database = await db()
    const item = await database.collection(tableName).findOne({ _id: new objectId(id)})

    if(!item) {
      throw new Error("Item not found")
    }

    const { _id, ...rest} = item
    return Object.freeze({ id: `${_id}`, ...rest})
  }

  async function findByHash(item) {
    try {
      const database = await db()
      const result = await database.collection(tableName).find({ hash: item.getHash() }).toArray()
      if(!result.length) {
        return null
      }
      const {_id: id, ...existingInfo } = result['0']
      return Object.freeze({ id, ...existingInfo })
    } catch (error) {
      throw error
    }
  }

  async function add(item) {
    try {
      const database = await db()
      const dbInsertResult = await database.collection(tableName).insertOne({ ...item, createdAt: Date.now(), updatedAt: Date.now() })
      const [{ _id: id, ...rest }] = dbInsertResult.ops
      return Object.freeze({ id, ...rest })
    } catch (error) {
      throw error
    }
    
  }

  async function list() {
    const database = await db()
    const listItems = await database.collection(tableName).find({}).toArray()
    return listItems.map(({_id: id, ...rest}) => {
      return Object.freeze({ id, ...rest})
    })
  } 

  async function remove(id) {
    const database = await db()
    const result = await database.collection(tableName).deleteOne({ _id: new objectId(id) }, { justOne: true })
    return result.deletedCount > 0 ? true : false
  }

  async function update({ id, ...rest }) {
    
    try {
      const database = await db()
      const timestamp = Date.now()
      const result = await database
        .collection(tableName)
        .updateOne({ _id: new objectId(id)}, { $set: { ...rest, updatedAt: timestamp} })
      if(result.modifiedCount > 0) {
        return Object.freeze({ id, ...rest})
      }
      return null
    } catch (error) {
      throw error
    }
  }
}

const createDatabaseController = makeCreateDatabaseController({ db: makeDb, objectId })

module.exports = createDatabaseController
