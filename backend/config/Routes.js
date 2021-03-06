const OngsController = require('../app/controllers/OngsController');
const IncidentsController = require('../app/controllers/IncidentsController');
const ProfileController = require('../app/controllers/ProfileController');
const SessionController = require('../app/controllers/SessionController');

module.exports = class Routes {

  constructor(app, dbConnection) {
    const ongsController = new OngsController(dbConnection);
    app.post('/ongs', ongsController.create);
    app.get('/ongs', ongsController.index);

    const incidentsController = new IncidentsController(dbConnection);
    app.post('/incidents', incidentsController.create);
    app.get('/incidents', incidentsController.index);
    app.delete('/incidents/:id', incidentsController.destroy);
    app.get('/incidents/:id', incidentsController.show);

    const profileController = new ProfileController(dbConnection);
    app.get('/profile', profileController.index);

    const sessionController = new SessionController(dbConnection);
    app.post('/sessions', sessionController.create);
  }
}
