const OngsController = require('../app/controllers/OngsController');
const IncidentsController = require('../app/controllers/IncidentsController');

module.exports = class Routes {

  constructor(app, dbConnection) {
    const ongsController = new OngsController(dbConnection);
    app.post('/ongs', ongsController.create);
    app.get('/ongs', ongsController.index);

    const incidentsController = new IncidentsController(dbConnection);
    app.post('/incidents', incidentsController.create);
    app.get('/incidents', incidentsController.index);
  }
}
