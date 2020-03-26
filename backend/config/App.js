const express = require('express');
const cors = require('cors');
const Routes =  require('./Routes');

const DBConnection = require('./DBConnection');

module.exports = class App {

  constructor() {
    this.app = express();

    this.app.use(cors());

    this.app.set('port', 3333);

    this.app.use(express.json());

    const dbConnection = new DBConnection();
    const _routes = new Routes(this.app, dbConnection.getConnection());
  }

  start() {
    this.app.listen(this.app.get('port'));
  }
}
