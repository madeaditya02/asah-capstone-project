const { pool } = require("../utils/index");
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");
const bcrypt = require("bcrypt"); 

class SalesService {

  async getAllSales({ search }) {
    const keyword = `%${search}%`;

    const [rows] = await pool.query(
      `SELECT id_user, nama, email 
       FROM users 
       WHERE peran = 'sales'
         AND (nama LIKE ? OR email LIKE ?)
       ORDER BY nama ASC`,
      [keyword, keyword]
    );

    return rows;
  }

  async getSalesById(id) {
    const [rows] = await pool.query(
      `SELECT id_user, nama, email 
       FROM users 
       WHERE id_user = ? AND peran = 'sales'
       LIMIT 1`,
      [id]
    );

    if (rows.length === 0) {
      throw new NotFoundError("Sales tidak ditemukan");
    }

    return rows[0];
  }

  async createSales({ nama, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10); 

    try {
      const [result] = await pool.query(
        `INSERT INTO users (nama, email, password, peran, total_menghubungi)
         VALUES (?, ?, ?, 'sales', 0)`,
        [nama, email, hashedPassword]
      );

      return result.insertId;

    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        throw new InvariantError("Email sudah digunakan");
      }
      throw err;
    }
  }

  async updateSales(id, { nama, email }) {
    const [existing] = await pool.query(
      `SELECT id_user FROM users WHERE id_user = ? AND peran = 'sales'`,
      [id]
    );

    if (existing.length === 0) {
      throw new NotFoundError("Sales tidak ditemukan");
    }

    await pool.query(
      `UPDATE users 
       SET nama = ?, email = ?
       WHERE id_user = ? AND peran = 'sales'`,
      [nama, email, id]
    );

    return { id };
  }

  async deleteSales(id) {
    const [existing] = await pool.query(
      `SELECT id_user FROM users WHERE id_user = ? AND peran = 'sales'`,
      [id]
    );

    if (existing.length === 0) {
      throw new NotFoundError("Sales tidak ditemukan");
    }

    await pool.query(
      `DELETE FROM users WHERE id_user = ? AND peran = 'sales'`,
      [id]
    );

    return { id };
  }
}

module.exports = SalesService;
