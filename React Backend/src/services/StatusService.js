const { pool } = require("../utils");

class StatusService {
  constructor() {
    this.pool = pool;
  }

  async getAllStatus() {
    const query = "SELECT id_status, nama_status FROM status";
    const [results] = await this.pool.query(query);

    return results;
  }
}

module.exports = StatusService;
