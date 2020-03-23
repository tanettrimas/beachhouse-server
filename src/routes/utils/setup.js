const createDatabaseController = require('../../controllers/database')

/**
 * @description Used to connect the database controller with the model controller service
 * @param {string} collection Name of the collection you want
 * @param {Function} makeCreateController The controllerobject (look at menucontroller for reference)
 * @returns {Function} A controllerfunction for interacting with the database and model
 */
function createController(collection, makeCreateController) {
  const databaseController = createDatabaseController(collection)
  const menuController = makeCreateController({ databaseController })
  return menuController
}

module.exports = createController