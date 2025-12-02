const { pool } = require("../utils/index");
const { default: autoBind } = require("auto-bind");

class StatusService {
  constructor() {
    this.pool = pool;

    autoBind(this);
  }

  async getAllStatus() {
    const query = "SELECT id_status, nama_status FROM status";
    const [results] = await this.pool.query(query);

    return results;
  }
}

module.exports = StatusService;
