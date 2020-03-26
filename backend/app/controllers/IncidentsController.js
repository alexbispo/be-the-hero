module.exports = class IncidentsController {

  constructor(dbConnetion) {
    this.dbConnetion = dbConnetion;
    this.create = this.create.bind(this);
    this.index = this.index.bind(this);
    this.destroy = this.destroy.bind(this);
    this.show = this.show.bind(this);
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

  async show(req, resp) {
    try {
      const { id } = req.params;

      const [result] = await this.dbConnetion('incidents')
        .where('id', '=', id)
        .select('*');

      resp.json(result);
    } catch (error) {
      console.error(error);
      resp.status(500).end();
    }
  }

  async destroy(req, resp) {
    try {
      const { id } = req.params;
      const ong_id = req.headers.authorization;

      const result = await this.dbConnetion('incidents')
      .where('id', '=', id)
      .where('ong_id', '=', ong_id)
      .del();

      if (result == 0) {
        return resp.status(404).end();
      }

      return resp.status(204).end();
    } catch (error) {
      console.error(error);
      return resp.status(500).end();
    }
  }
}
