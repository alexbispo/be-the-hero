module.exports = class OngsController {

  create(req, resp) {
    const data = req.body;
    return resp.json(data);
  }
}
