const express = require('express');
const Routes =  require('./Routes');

module.exports = class App {

  constructor() {
    this.app = express();

    this.app.set('port', 3333);

    this.app.use(express.json());

    this.routes = new Routes(this.app);
  }

  start() {
    this.app.listen(this.app.get('port'));
  }
}
