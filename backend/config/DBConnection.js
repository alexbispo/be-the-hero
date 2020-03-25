const knex = require('knex');
const configuration = require('../knexfile');

module.exports =  class DBConnection {

  constructor() {
    this.connection = knex(configuration.development);
  }

  getConnection() {
    return this.connection;
  }
}
