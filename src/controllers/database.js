const { makeDb, objectId} = require('../db/connect')

const makeCreateDatabaseController = ({ db, objectId}) => (tableName) => {
  return {
    add,
    list,
    remove,
    update,
    findByHash
  }

  async function findByHash(item) {
    try {
      const database = await db()
      const result = await database.collection(tableName).find({ hash: item.getHash() }).toArray()
      if(!result.length) {
        return null
      }
      const {_id: id, ...existingInfo } = result['0']
      return { id, ...existingInfo }
    } catch (error) {
      throw error
    }
  }

  async function add(item) {
    try {
      const database = await db()
      const dbInsertResult = await database.collection(tableName).insertOne({ ...item })
      const [{ _id: id, ...rest }] = dbInsertResult.ops
      return { id, ...rest }
    } catch (error) {
      throw error
    }
    
  }

  async function list() {
    const database = await db()
    const listItems = await database.collection(tableName).find({}).toArray()
    return listItems.map(({_id: id, ...rest}) => ({ id, ...rest}))
  } 
  //TODO: implement
  async function remove(item) {}

  async function update({ id: _id, ...rest }) {
    try {
      const database = await db()
      const result = await database
        .collection(tableName)
        .updateOne({ "_id": new objectId(_id)}, { $set: rest })
      return result.modifiedCount > 0 ? { id: _id, ...rest} : null
    } catch (error) {
      throw error
    }
    
  }
}

const createDatabaseController = makeCreateDatabaseController({ db: makeDb, objectId})

module.exports = createDatabaseController
