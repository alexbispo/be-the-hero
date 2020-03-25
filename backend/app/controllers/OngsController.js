const crypto = require('crypto');

module.exports = class OngsController {

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
    this.create = this.create.bind(this);
  }

  async create(req, resp) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await this.dbConnection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return resp.json({ id });
  }
}
