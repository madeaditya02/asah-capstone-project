const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");
const { pool } = require("../utils/index");

class ProfileService {
  constructor() {
    this.pool = pool;
  }

  async getProfileById(id) {
    const [rows] = await this.pool.query(
      `SELECT id_user, nama, email, peran, total_menghubungi, dibuat_pada
       FROM users WHERE id_user = ? LIMIT 1`,
      [id]
    );

    if (rows.length === 0) throw new NotFoundError("Pengguna tidak ditemukan");

    return rows[0];
  }

  async getAllProfiles() {
    const [rows] = await this.pool.query(
      `SELECT id_user, nama, email, peran, total_menghubungi, dibuat_pada
       FROM users`
    );

    return rows;
  }

 
  async updateProfile(id_user, payload) {
    const { nama, email } = payload;

    const [rows] = await this.pool.query(
      `SELECT id_user FROM users WHERE id_user = ? LIMIT 1`,
      [id_user]
    );

    if (rows.length === 0) {
      throw new NotFoundError("Pengguna tidak ditemukan");
    }

    await this.pool.query(
      `UPDATE users SET nama = ?, email = ? WHERE id_user = ?`,
      [nama, email, id_user]
    );

    return { id_user };
  }


  async deleteProfile(id_user) {
    const [rows] = await this.pool.query(
      `SELECT id_user FROM users WHERE id_user = ? LIMIT 1`,
      [id_user]
    );

    if (rows.length === 0) {
      throw new NotFoundError("Pengguna tidak ditemukan");
    }

    await this.pool.query(`DELETE FROM users WHERE id_user = ?`, [id_user]);

    return { id_user };
  }
}

module.exports = ProfileService;
