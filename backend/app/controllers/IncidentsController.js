module.exports = class IncidentsController {

  constructor(dbConnetion) {
    this.dbConnetion = dbConnetion;
    this.create = this.create.bind(this);
    this.index = this.index.bind(this);
  }

  async index(req, resp) {
    try {
      const incidents =  await this.dbConnetion('incidents')
      .select('*');

      return resp.json(incidents);
    } catch (error) {
      console.error(error);
      return resp.status(500).end();
    }
  }

  async create(req, resp) {
    try {
      const { title, description, value } = req.body;

      const ongId = req.headers.authorization;

      const [id] = await this.dbConnetion('incidents')
                  .insert({
                    ong_id: ongId,
                    title,
                    description,
                    value
                  });


      return resp.json({id});
    } catch (error) {
      console.error(error);
      return resp.status(500).end();
    }
  }
}
