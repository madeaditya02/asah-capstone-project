const { nanoid } = require("nanoid");
const NotFoundError = require("../exceptions/NotFoundError");
const InvariantError = require("../exceptions/InvariantError");
const { pool } = require("../utils");

class CatatanService {
  constructor() {
    this.pool = pool;
  }

  async addCatatan({ deskripsi, waktuDihubungi, durasi, statusId }) {
    const id = nanoid(16);

    const query =
      "INSERT INTO catatan (id_catatan, deskripsi_catatan, waktu_dihubungi, durasi, id_status) VALUES (?, ?, ?, ?, ?)";
    const values = [id, deskripsi, waktuDihubungi, durasi, statusId];

    const [result] = await this.pool.query(query, values);

    if (result.affectedRows !== 1) {
      throw new InvariantError("Catatan gagal ditambahkan");
    }

    return id;
  }

  async updateCatatanById(id, {deskripsi, durasi, statusId }) {
    const query =
      "UPDATE catatan SET deskripsi_catatan = ?, durasi = ?, id_status = ? WHERE id_catatan =?";
    const values = [deskripsi, durasi, statusId, id];

    const [result] = await this.pool.query(query, values);

    if (result.affectedRows !== 1) {
      throw new NotFoundError("Catatan gagal diperbarui. Id tidak ditemukan");
    }

    return id;
  }

  async getAllCatatan() {
    const query =
      `SELECT catatan.id_catatan, catatan.waktu_dihubungi, catatan.durasi, status.id_status, status.nama_status FROM catatan JOIN status ON catatan.id_status = status.id_status`;
    const [results] = await this.pool.query(query);

    return results;
  }

  async getCatatanById(id) {
    const query =
      "SELECT * FROM catatan JOIN status ON catatan.id_status = status.id_status WHERE catatan.id_catatan = ?";
    const values = [id];

    const [results] = await this.pool.query(query, values);

    if (results.length === 0) {
      throw new NotFoundError("Catatan tidak ditemukan");
    }

    return results[0];
  }

  async deleteCatatanById(id) {
    const query = "DELETE FROM catatan WHERE id_catatan = ?";
    const values = [id];

    const [results] = await this.pool.query(query, values);

    if (results.affectedRows !== 1) {
      throw new NotFoundError("Catatan gagal dihapus. Id tidak ditemukan");
    }
  }
}

module.exports = CatatanService;
