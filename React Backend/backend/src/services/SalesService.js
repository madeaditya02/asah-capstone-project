const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

let pool;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'bank_sales',
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
};

const SalesService = {

 
  // GET ALL SALES
 
  getAllSales: async () => {
    const db = getPool();

    const [rows] = await db.query(
      `SELECT 
          id_user, 
          nama, 
          email, 
          peran, 
          total_menghubungi,
          dibuat_pada 
       FROM users 
       WHERE peran = 'sales'`
    );

    return rows;
  },

 
  // CREATE SALES
 
  createSales: async (payload) => {
    const { nama, email, password } = payload;
    const db = getPool();

 
    const [existing] = await db.query(
      "SELECT email FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existing.length > 0) {
      throw new InvariantError('Email sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const [result] = await db.query(
      `INSERT INTO users 
        (nama, email, password, peran, total_menghubungi) 
       VALUES (?, ?, ?, 'sales', 0)`,
      [nama, email, hashedPassword]
    );

    return { id_user: result.insertId };
  },

 
  // UPDATE SALES

  updateSales: async (id_user, payload) => {
    const db = getPool();

    
    const [existing] = await db.query(
      "SELECT id_user FROM users WHERE id_user = ? AND peran = 'sales'",
      [id_user]
    );

    if (existing.length === 0) {
      throw new NotFoundError('Sales tidak ditemukan');
    }

    const { nama, email, password, total_menghubungi } = payload;

    const fields = [];
    const values = [];

    if (nama) {
      fields.push("nama = ?");
      values.push(nama);
    }

    if (email) {
      fields.push("email = ?");
      values.push(email);
    }

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      fields.push("password = ?");
      values.push(hashed);
    }

    if (total_menghubungi !== undefined) {
      fields.push("total_menghubungi = ?");
      values.push(total_menghubungi);
    }

    values.push(id_user);

    await db.query(
      `UPDATE users SET ${fields.join(", ")} WHERE id_user = ?`,
      values
    );

    return { id_user };
  },

  // DELETE SALES

  deleteSales: async (id_user) => {
    const db = getPool();

    const [existing] = await db.query(
      "SELECT id_user FROM users WHERE id_user = ? AND peran = 'sales'",
      [id_user]
    );

    if (existing.length === 0) {
      throw new NotFoundError('Sales tidak ditemukan');
    }

    await db.query(
      "DELETE FROM users WHERE id_user = ?",
      [id_user]
    );

    return { id_user };
  },
};

module.exports = SalesService;
