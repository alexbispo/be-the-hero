const OngsController = require('../app/controllers/OngsController');

module.exports = class Routes {

  constructor(app) {
    const ongsController = new OngsController();
    app.post('/', ongsController.create);

  }
}
