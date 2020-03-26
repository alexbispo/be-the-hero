module.exports = class ProfileController {

  constructor(dbConnection) {
    this.dbConnection = dbConnection;
    this.index = this.index.bind(this);
  }

  async index(req, resp) {
    try {
      const ongId = req.headers.authorization;

      const result = await this.dbConnection('incidents')
        .where('ong_id', '=', ongId)
        .select('*');

      return resp.json(result);
    } catch (error) {
      console.error(error);
      return resp.status(500).end();
    }
  }
}
