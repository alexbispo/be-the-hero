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

      if (!result) {
        return resp.status(404).end();
      }

      return resp.json(result);
    } catch (error) {
      console.error(error);
      resp.status(500).end();
    }
  }

  async destroy(req, resp) {
    try {
      const { id } = req.params;
      const ong_id = req.headers.authorization;

      const [incident] = await this.dbConnetion('incidents')
        .where('id', '=', id)
        .select('ong_id')

      if (!incident) {
        return resp.status(404).end();
      }

      if (incident.ong_id != ong_id) {
        return resp.status(401).json({  error: 'Operation not peermitted.' })
      }

      await this.dbConnetion('incidents')
        .where('id', '=', id)
        .where('ong_id', '=', ong_id)
        .del();

      return resp.status(204).end();
    } catch (error) {
      console.error(error);
      return resp.status(500).end();
    }
  }
}
