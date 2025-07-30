// backend/src/config/mikro-orm.config.js
const { SqliteDriver } = require('@mikro-orm/sqlite');
const { RequestHistory } = require('../entities/RequestHistory');

module.exports = {
  driver: SqliteDriver,
  entities: [RequestHistory],
  dbName: 'http-client.db',
  debug: true,
  discovery: {
    requireEntitiesArray: true, // Important for ES modules
  },
};