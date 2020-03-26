module.exports = class SessionController {

  constructor(dbConnetion) {
    this.dbConnetion = dbConnetion;
    this.create = this.create.bind(this);
  }

  async create(req, resp) {
    try {
      const { id } = req.body;

      const [ong] = await this.dbConnetion('ongs')
        .where('id', '=', id)
        .select('*');

      if (!ong) {
        return resp.status(400).json({ error: 'No ONG found with this ID' });
      }

      return resp.json(ong);
    } catch (error) {
      console.error(error);
      return resp.status(500).end();
    }
  }
}
