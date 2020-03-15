const mongodb = require('mongodb')


const MongoClient = mongodb.MongoClient

const url = `mongodb+srv://${process.env.DB_USR}:${process.env.DB_PASS}@cluster0-j64c1.mongodb.net/test?retryWrites=true&w=majority`
const dbName = process.env.DB_NAME
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

async function makeDb () {
  try {
    if (!client.isConnected()) {
      await client.connect()
    }
    console.log('connected')
    return client.db(dbName)
  } catch (error) {
    throw new Error(error.message)
  } 
}

module.exports = { makeDb, objectId: mongodb.ObjectID}
