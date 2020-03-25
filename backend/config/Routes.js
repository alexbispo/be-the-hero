const OngsController = require('../app/controllers/OngsController');

module.exports = class Routes {

  constructor(app, dbConnection) {
    const ongsController = new OngsController(dbConnection);
    app.post('/ongs', ongsController.create);

  }
}
