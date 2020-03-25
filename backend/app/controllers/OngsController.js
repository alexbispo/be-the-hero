const crypto = require('crypto');

module.exports = class OngsController {

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
    this.create = this.create.bind(this);
    this.index = this.index.bind(this);
  }

  async index(req, resp) {
    try {
      const ongs = await this.dbConnection('ongs').select('*');

      return resp.json(ongs);
    } catch (error) {
      console.error(error);
      return resp.status(500).end();
    }
  }

  async create(req, resp) {
    try {
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

    } catch (error) {
      console.error(error);
      return resp.status(500).end();
    }
  }
}
