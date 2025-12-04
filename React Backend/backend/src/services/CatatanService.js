const { nanoid } = require("nanoid");
const NotFoundError = require("../exceptions/NotFoundError");
const InvariantError = require("../exceptions/InvariantError");
const { default: autoBind } = require("auto-bind");
const { pool } = require("../utils/index");
const AuthorizationError = require("../exceptions/AuthorizationError");

class CatatanService {
  constructor() {
    this.pool = pool;

    autoBind(this);
  }

  async addCatatan({ deskripsi, waktuDihubungi, durasi, statusId, nasabahId, userId }) {
    const catatanId = nanoid(16);

    const query =
      "INSERT INTO catatan (id_catatan, deskripsi_catatan, waktu_dihubungi, durasi, id_nasabah, id_user, id_status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [catatanId, deskripsi, waktuDihubungi, durasi,nasabahId, userId, statusId];

    const [result] = await this.pool.query(query, values);

    if (result.affectedRows !== 1) {
      throw new InvariantError("Catatan gagal ditambahkan");
    }

    return catatanId;
  }

  async verifyOwnerCatatan(userId, catatanId) {
    const query = "SELECT * FROM catatan WHERE id_catatan = ?";
    const values = [catatanId];

    const [result] = await this.pool.query(query, values);

    if (result.affectedRows !== 1) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    if(result[0].id_user !== userId) {
      throw new AuthorizationError('Anda tidak berhak memodifikasi catatan ini');
    }
  }

  async updateCatatanById(catatanId, userId, { deskripsi, durasi, statusId }) {
    await this.verifyOwnerCatatan(userId, catatanId);

    const query =
      "UPDATE catatan SET deskripsi_catatan = ?, durasi = ?, id_status = ? WHERE id_catatan =?";
    const values = [deskripsi, durasi, statusId, catatanId];

    const [result] = await this.pool.query(query, values);

    if (result.affectedRows !== 1) {
      throw new NotFoundError("Catatan gagal diperbarui. Id tidak ditemukan");
    }

    return catatanId;
  }

  async getAllCatatan() {
    const query = `SELECT catatan.id_catatan, catatan.waktu_dihubungi, catatan.durasi, status.id_status, status.nama_status FROM catatan JOIN status ON catatan.id_status = status.id_status`;
    const [results] = await this.pool.query(query);

    return results;
  }

  async getCatatanById(catatanId) {
    const query =
      "SELECT * FROM catatan JOIN status ON catatan.id_status = status.id_status WHERE catatan.id_catatan = ?";
    const values = [catatanId];

    const [results] = await this.pool.query(query, values);

    if (results.length === 0) {
      throw new NotFoundError("Catatan tidak ditemukan");
    }

    return results[0];
  }

  async deleteCatatanById(catatanId, userId) {
    await this.verifyOwnerCatatan(userId, catatanId);

    const query = "DELETE FROM catatan WHERE id_catatan = ?";
    const values = [catatanId];

    const [results] = await this.pool.query(query, values);

    if (results.affectedRows !== 1) {
      throw new NotFoundError("Catatan gagal dihapus. Id tidak ditemukan");
    }
  }
}

module.exports = CatatanService;
