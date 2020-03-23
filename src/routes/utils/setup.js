const createDatabaseController = require('../../controllers/database')

/**
 * @description Used to connect the database controller with the model controller service
 * @param {string} collection Name of the collection you want
 * @param {Function} makeCreateController The controllerobject (look at menucontroller for reference)
 * @param {Object} deps Dependencies used by the controller
 */
function createController(collection, makeCreateController, deps) {
  const databaseController = createDatabaseController(collection)
  const controller = makeCreateController({ databaseController, deps })
  return controller
}
module.exports = createController